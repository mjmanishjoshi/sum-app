import {
  Component, OnInit, ViewChildren, QueryList, AfterViewInit, Type,
  NgModuleFactoryLoader, NgModuleFactory, Injector, NgModuleRef
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
    private srv: DashboardService) { }

  ngOnInit() {
    this.loader.load('./tiles/tiles.module#TilesModule').then(f => {
      this.factory = f;
    });
    this.srv.layout.subscribe(l => {
      if (l != null) {
        this.loadLayout();
      }
    })
  }

  ngAfterViewInit() {
    this.tileChildren.changes.subscribe(() => {
      this.createTileComponent();
    });
  }

  private layoutRows: LayoutRowInfo[];
  private isLayoutLoaded: boolean = false;
  loadLayout() {
    this.isLayoutLoaded = false;
    this.srv.currentLayoutTitle = "";
    this.afs.doc<LayoutUsageInfo>('accounts/' + this.srv.layout.value.accid +
      '/layouts/' + this.srv.layout.value.layoutid).valueChanges()
      .subscribe(l => {
        this.srv.currentLayoutTitle = l.title;
        this.layoutRows = l.rows;
        this.isLayoutLoaded = true;
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

  private isEditing: boolean = false;
  private dragGroup: string = "";
  onEditDashboard() {
    this.isEditing = true;
    this.dragGroup = "TILES";
  }
  onDoneDashboard(doSave: boolean) {
    this.isEditing = false;
    this.dragGroup = "";
    if (doSave) {

    }
    this.loadLayout();
  }

}
