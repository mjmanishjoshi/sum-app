import {
  Component, OnInit, ViewChildren, QueryList, AfterViewInit, Type,
  NgModuleFactoryLoader, NgModuleFactory, Injector, NgModuleRef, ChangeDetectorRef
} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { TileDirective } from '../tile.directive';
import { TileComponent } from '../tile.component';
import { TileModule } from '../tile.module';
import { DashboardService } from '../dashboard.service';

interface LayoutUsageInfo {
  title: string;
  rows: LayoutRowInfo[];
}
interface LayoutRowInfo {
  cols: LayoutColInfo[];
}
interface LayoutColInfo {
  rowspan: number;
  colspan: number;
  width: string;
}

@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, AfterViewInit {
  private factory: NgModuleFactory<TileModule> = null;

  @ViewChildren(TileDirective) tileChildren: QueryList<TileDirective>;

  constructor(private afs: AngularFirestore, private loader: NgModuleFactoryLoader, private injector: Injector,
    private srv: DashboardService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loader.load('./tiles/tiles.module#TilesModule').then(f => {
      this.factory = f;
    });
    this.srv.layout.subscribe(l => {
      if (l != null) {
        this.loadLayout();
      }
    });
  }

  ngAfterViewInit() {
    this.tileChildren.changes.subscribe(() => {
      this.createTileComponent();
      // This is to prevent ExpressionChangedAfterItHasBeenCheckedError
      this.cd.detectChanges();
    });
  }

  private layoutRows: LayoutRowInfo[];
  loadLayout() {
    this.srv.isEditing = false;
    this.afs.doc<LayoutUsageInfo>('accounts/' + this.srv.account.value +
      '/layouts/' + this.srv.layout.value).valueChanges()
      .subscribe(l => {
        this.layoutRows = l.rows;
      });
  }
  createTileComponent() {
    if (this.factory == null) {
      return;
    }
    const module: NgModuleRef<TileModule> = this.factory.create(this.injector);
    const componentType: Type<TileComponent> = module.instance.getTileComponent("Collaboration");
    const resolver = module.componentFactoryResolver;
    const compFactory = resolver.resolveComponentFactory(componentType);
    this.tileChildren.forEach(function (item, index, array) {
      item.viewContainerRef.createComponent(compFactory);
    });
  }

  private dragGroup: string = "";
  /*onEditDashboard() {
    this.srv.isEditing = true;
    this.dragGroup = "TILES";
  }
  onDoneDashboard(doSave: boolean) {
    this.srv.isEditing = false;
    this.dragGroup = "";
    if (doSave) {

    }
    this.loadLayout();
  }*/
}
