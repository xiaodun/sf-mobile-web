<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  width: 100%;
  height: 100%;
}

body {
  overflow-y: auto;

  background-color: #fff;

  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #qrcode-id {
    position: fixed;
    z-index: 999;

    width: 100%;
    height: 100%;

    transition: .25s ease-in-out;
    transform: scale(0);

    background-color: rgba(0, 0, 0, .2);

    img {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      box-shadow: 3px 2px 2px 1px rgba(255, 255, 255);
    }

    &.active {
      transform: scale(1);
    }
  }
}

</style>
<template>
  <div id="app">
    <vue-touch
      tag="div"
      @doubletap="close_qrcode"
    >
      <div
        id="qrcode-id"
        ref="qrcode"
      ></div>
    </vue-touch>
    <LocalizePagecontainer :footer-list="['应用列表','我']">
      <LocalizeHeader
        slot="header"
        title="7号楼"
      >

        <LocalizeDropmenu
          slot="right"
          :menu-item="[{icon:'icon-weibiaoti--',content:'二维码分享'}]"
          @tap-item="tapItem"
        ></LocalizeDropmenu>
      </LocalizeHeader>

      <div slot="page-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, eaque.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, doloribus necessitatibus velit dolorum nihil, quasi eligendi recusandae placeat eaque iusto ipsam aperiam aliquid consequatur repudiandae architecto aspernatur aut magni error libero possimus quaerat vitae quisquam esse alias. Minima exercitationem laboriosam ratione magnam consequuntur velit similique. Quia, voluptatibus sunt tempore, in corrupti recusandae nulla laboriosam at voluptas quod labore! In modi ipsa quam aliquam aperiam deleniti amet adipisci voluptatem accusamus ipsum. Natus, nobis cum reprehenderit voluptatem ipsa explicabo veritatis dolorum molestias officia doloremque delectus laudantium quibusdam provident est corrupti tenetur iusto consectetur ipsum sed minus accusantium. Sed sint repellat recusandae quaerat.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ad tempore, nihil itaque sint quae deleniti consequatur nam, rerum optio voluptas aut sapiente sed voluptatum ut quisquam eius! Quis, totam rem! Pariatur, officiis. Labore debitis commodi nobis natus neque nihil. Aperiam, vitae perferendis! Molestiae placeat tempora mollitia provident animi itaque similique deserunt aliquam nulla porro. Nisi molestias veritatis quos facere iure necessitatibus harum, alias suscipit asperiores totam adipisci numquam mollitia reprehenderit temporibus beatae tempore quo, dolore ab, repellendus blanditiis atque perspiciatis cum quibusdam at. Harum asperiores at neque recusandae eius vero, iste nemo, praesentium architecto nam non iure nesciunt amet.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quaerat doloribus exercitationem tempora nisi veritatis dignissimos autem accusantium, excepturi sunt, eligendi maxime cupiditate mollitia nesciunt veniam. Exercitationem vitae incidunt distinctio non maiores officia ullam alias amet et soluta, delectus, deleniti expedita quaerat est sequi commodi! Praesentium, perferendis? Ratione cum odit nam laboriosam saepe quidem itaque animi, error voluptatem consequuntur tempora laudantium, sapiente quas, doloremque ipsum optio ab iste veritatis aut deleniti! Voluptas placeat ratione, nemo illo praesentium ut officia voluptatum, dignissimos ullam eaque quis rem reiciendis unde fugiat? Accusamus, porro eligendi laudantium incidunt quaerat inventore odio saepe possimus alias laborum, sed reiciendis veniam deserunt quam libero aperiam et voluptates impedit provident molestiae! Eos soluta optio vel, maxime vero nemo sed, rem earum fugit commodi aspernatur, voluptatibus et aliquam voluptate modi dolorum repellendus esse culpa facilis sunt recusandae ut autem tenetur! Excepturi fuga est nisi numquam. Ducimus quos officia doloribus repudiandae consequatur quo dicta, vitae eius ipsum quas amet? Optio, commodi nobis quod consequatur eligendi dolore corrupti id doloribus doloremque fugiat fuga nemo error dolorem animi corporis, voluptas laboriosam eius voluptates repellat suscipit modi maiores. Dolore vero id totam amet architecto quaerat impedit voluptatibus ex excepturi voluptates tempora minus tenetur fugiat, veritatis perferendis cumque nisi vel dolor! Cupiditate, corporis earum debitis quas quae eveniet voluptatem soluta natus reprehenderit totam laudantium officia in voluptatum nemo culpa expedita fuga illum temporibus architecto ex ad quam illo nam. Itaque porro iste numquam mollitia, architecto eaque dignissimos vel modi! Necessitatibus quam laborum minus dolores earum reiciendis, ipsum adipisci rem ipsam mollitia laboriosam magni non enim error et ullam cum sed porro nihil ad? Nam perspiciatis est nihil deleniti autem enim eius. Ipsam eos accusantium saepe soluta fugit eaque cupiditate delectus deleniti ex in, ratione, iure, libero ducimus repellendus. Adipisci deserunt non quo officiis odio, quam ipsum quasi eos aliquam rem, vel amet, nobis placeat magnam dolor quos aperiam! In labore odit, magni iusto eligendi explicabo! Cum culpa nam amet. Earum dolore tempora, maxime, ex repellat distinctio deserunt deleniti necessitatibus, eos perferendis saepe. Maxime eos laudantium consectetur, quos excepturi nulla facere repellendus non nobis dicta quod, praesentium suscipit commodi dolor. Reiciendis voluptatum ipsum quas exercitationem libero, error enim dolor quasi? Vitae facilis quae velit facere, molestiae enim voluptatem explicabo repellat tempora maiores. Nulla inventore tempora distinctio sit, eveniet sequi minus ad dignissimos impedit, eius enim eligendi atque. Tempore, sed! Corporis tempore officiis officia? Quos eius suscipit quae adipisci quis dolorem officia similique, laudantium blanditiis recusandae dicta magnam excepturi iure harum, nobis, in dolor perferendis atque ipsa totam minus voluptates quaerat? Fugit neque blanditiis officiis? Dignissimos, at officiis nesciunt modi molestiae veniam veritatis fugit minus. Soluta distinctio, commodi magni magnam repudiandae consectetur, vitae aspernatur voluptatum earum totam minus velit consequuntur atque suscipit, animi ratione rem recusandae perferendis cum maxime vel aliquam. Vero repudiandae maiores voluptatum libero aperiam dolores? Veritatis blanditiis, quod laborum eveniet quia, harum ea culpa ratione excepturi, deleniti tenetur architecto incidunt cum. Id harum dolore consequuntur voluptate quae vel numquam cupiditate aliquid. Accusantium, animi provident.
      </div>

      <div slot="page-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique.
      </div>
    </LocalizePagecontainer>
  </div>

</template>

<script>
import QRCode from "qrcodejs2";
import Player from "@/components/tools/player.vue";
import LocalizePagecontainer from "@/Localize-UI/Localize-pagecontainer.vue";
import LocalizeHeader from "@/Localize-UI/Localize-header.vue";
import LocalizeDropmenu from "@/Localize-UI/Localize-dropmenu.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    QRCode,
    Player,
    LocalizePagecontainer,
    LocalizeHeader,
    LocalizeDropmenu
  },
  methods: {
    tapItem(argItem, argIndex) {
      if (argIndex === 0) {
        //点击了二维码
        this.createQecode();
        this.$refs.qrcode.classList.add("active");
      }
    },
    close_qrcode() {
      this.$refs.qrcode.classList.remove("active");
    },
    createQecode() {
      this.$refs.qrcode.innerHTML = "";
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "127.0.0.1"
      ) {
        this.$refs.qrcode.innerHTML = "请确保你连上了网络！";
      } else {
        new QRCode("qrcode-id", {
          width: 232, // 设置宽度
          height: 232, // 设置高度
          text: window.location.protocol + "//" + window.location.host
        });
      }
    }
  },
  mounted() {}
};
</script>


