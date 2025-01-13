import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "hide-topic-title",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.decorateCookedElement(
          (cooked, helper) => {
            console.log("-----333---")
            if (helper.controllerName === "topic") {
              const title = cooked.querySelector(".quote .title>a");
              if (title && /t-bot-\d{13,13}/.test(title.innerText)) {
                title.style.display = "none";
              }
            }
          }
      );

      api.modifyClass("component:topic-list-item", {
        pluginId: "hide-topic-title",
        didInsertElement() {
          this._super(...arguments); // 调用原始的 didInsertElement 方法
          console.log('topic-进入插件内部')
          const title = this.element.querySelector(".topic-title");

          if(title && /t-bot-\d{13,13}/.test(title.innerText)){
            console.log('topic-插件匹配通过')
            title.style.display = "none";
          }
        },
      });

      api.onPageChange(() => {
        console.log('topic-detail-进入插件内部')
        // 判断是否是主题详情页
        if (window.location.pathname.includes("/t/")) {
          const topicTitle = document.querySelector(".title-wrapper h1");
          if(topicTitle && /t-bot-\d{13,13}/.test(topicTitle.innerText)){
            console.log('topic-detail-插件匹配通过')
            topicTitle.style.display = "none"; // 隐藏标题
          }
          const quotedTitle = document.querySelector(".quote .title>a");
          console.log('topic-quoted-检查是否为空 ' + quotedTitle)
          if(quotedTitle && /t-bot-\d{13,13}/.test(quotedTitle.innerText)){
            console.log('topic-quoted-插件匹配通过')
            quotedTitle.style.display = "none"; // 隐藏标题
          }
        }
      })

    });
  },
};
