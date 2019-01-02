import Vue from 'vue';
import LocalizeCard from '@/Localize-UI/Localize-card';
import LocalizeDropmenu from '@/Localize-UI/Localize-dropmenu.vue';
import LocalizeFooter from '@/Localize-UI/Localize-footer.vue';
import LocalizeHeader from '@/Localize-UI/Localize-header.vue';
import LocalizeIconfont from '@/Localize-UI/Localize-iconfont';
import LocalizeNativefile from '@/Localize-UI/Localize-nativefile';
import LocalizePage from '@/Localize-UI/Localize-page.vue';
import LocalizePagecontainer from '@/Localize-UI/Localize-pagecontainer.vue';
import LocalizeProgress from '@/Localize-UI/Localize-progress';
import LocalizeUpload from '@/Localize-UI/Localize-upload';
const components = {
  LocalizeCard,
  LocalizeDropmenu,
  LocalizeFooter,
  LocalizeHeader,
  LocalizeIconfont,
  LocalizeNativefile,
  LocalizePage,
  LocalizePagecontainer,
  LocalizeProgress,
  LocalizeUpload,
};
Object.keys(components).forEach((key, index, arr) => {
  Vue.component(key, components[key]);
});
