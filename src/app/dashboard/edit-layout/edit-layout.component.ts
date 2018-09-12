import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LayoutUsageInfo {
  title: string;
  pageCatalogRef: DocumentReference;
  tileCatalogRef: DocumentReference;
}

interface TileConfigInfo extends TileConfigInfoData {
  tileConfigId: string;
}
interface TileConfigInfoData {
  name: string;
  configuration: any;
}

interface PageConfigInfo extends PageConfigInfoData {
  pageConfigId: string;
}
interface PageConfigInfoData {
  name: string;
  columns: number;
}

interface PageInfo extends PageInfoData {
  pageId: string;
}
interface PageInfoData {
  title: string;
  pageConfigRef: DocumentReference;
}

@Component({
  selector: 'dashboard-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.sass']
})
export class EditLayoutComponent implements OnInit {

  constructor(private srv: DashboardService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.srv.layout.subscribe(l => {
      if (l != null) {
        this.loadLayout();
      }
    });
  }

  private layout: LayoutUsageInfo;
  loadLayout() {
    this.srv.isEditing = true;
    this.afs.doc<LayoutUsageInfo>('accounts/' + this.srv.account.value +
      '/layouts/' + this.srv.layout.value).valueChanges()
      .subscribe(l => {
        this.layout = l;
        this.loadToolPalette();
        this.loadPagePalette();
      });
  }

  private tileConfigs: TileConfigInfo[];
  private pageConfigs: PageConfigInfo[];
  loadToolPalette() {
    this.layout.tileCatalogRef.collection('tileConfigs').onSnapshot(q => {
      this.tileConfigs = [];
      q.forEach(doc => {
        const data = doc.data() as TileConfigInfoData;
        const id = doc.id;
        this.tileConfigs.push({ tileConfigId: id, ...data });
      });
    });
    this.layout.pageCatalogRef.collection('pageConfigs').onSnapshot(q => {
      this.pageConfigs = [];
      q.forEach(doc => {
        const data = doc.data() as PageConfigInfoData;
        const id = doc.id;
        this.pageConfigs.push({ pageConfigId: id, ...data });
      });
    });
  }

  private pages: Observable<PageInfo[]>;
  loadPagePalette() {
    this.currentPage = null;
    this.pages = this.afs.collection<PageInfoData>('accounts/' + this.srv.account.value + '/layouts/' + this.srv.layout.value + '/pages')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as PageInfoData;
          const id = a.payload.doc.id;
          return { pageId: id, ...data };
        }))
      );
  }

  onDropPage($event: any) {
    const pageConfig: PageConfigInfo = $event.dragData;
    const pageInfo: PageInfoData = {
      title: pageConfig.name,
      pageConfigRef: this.layout.pageCatalogRef.collection('pageConfigs').doc(pageConfig.pageConfigId)
    };
    this.afs.collection<PageInfoData>('accounts/' + this.srv.account.value + '/layouts/' + this.srv.layout.value + '/pages').add(pageInfo);
  }

  onDropTile($event: any) {
    const tileConfig: TileConfigInfo = $event.dragData;
  }

  private currentPage: PageInfo = null;
  private currentPageConfig: PageConfigInfoData = null;
  onPageSelection(page: PageInfo) {
    this.currentPage = page;
    this.currentPage.pageConfigRef.onSnapshot(d => {
      this.currentPageConfig = d.data() as PageConfigInfoData;
    });
  }
}
