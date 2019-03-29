<template>
  <div class="sidebar" :class="{show:isShowSideBar,dark:nightMode}">
    <div class="back-btn" @click="hideSideBar()" :class="{dark:nightMode}">
      <i class="fas fa-long-arrow-alt-right"></i>
    </div>
    <div class="sidebar-content">
      <div class="night-mode">
        <h4 :class="{dark:nightMode}">夜間模式</h4>
        <ToggleButton/>
      </div>
      <div class="table" :class="{dark:nightMode}">
        <div class="table-thead">我的語錄</div>
        <div class="table-body">
          <div class="table-row" v-for="(item,index) in sentences" :key="index">
            <p v-if="editingIndex!=index">{{item}}</p>
            <input
              type="text"
              :value="item"
              @blur="changeEditingText"
              @keydown.enter="changeEditingText"
              v-if="editingIndex===index"
              v-focus
            >
            <div @click="edit(index)">
              <i class="fas fa-pen"></i>
            </div>
            <div @click="del(index)">
              <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "./ToggleButton";
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      editingText: "",
      isEditing: false,
      editingIndex: null
    };
  },
  components: {
    ToggleButton
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    hideSideBar() {
      this.$store.dispatch("isShowSideBar", !this.isShowSideBar);
    },
    changeEditingText(e) {
      this.editingText = e.target.value;
      this.$store.dispatch("updateSentence", {
        ctx: this.editingText,
        index: this.editingIndex
      });
      this.editingIndex = null;
    },
    edit(index) {
      this.isEditing = true;
      this.editingIndex = index;
    },
    del(index) {
      this.$store.dispatch("deleteSentence", index);
    }
  },
  computed: {
    ...mapGetters(["nightMode", "isShowSideBar", "sentences"])
  },
  created() {}
};
</script>

<style scoped lang="scss">
.back-btn {
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
  i {
    font-size: 36px;
  }
  &::before {
    content: "BACK";
    font-size: 20px;
    color: #000;
    position: absolute;
    font-weight: 700;
    transition: all 0.3s ease-in;
    top: 7px;
    right: -35px;
    opacity: 0;
  }
  &:hover::before {
    top: 7px;
    right: -60px;
    opacity: 1;
  }
  &.dark,
  &.dark:hover::before {
    color: #fff;
  }
}

.sidebar {
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  min-width: 300px;
  height: 100%;
  padding: 48px 20px;
  background-color: #fff;
  transform: translateX(100%);
  transition: all 0.3s;
  &.dark {
    background-color: #000;
  }
}
.sidebar.show {
  transform: none;
}
.sidebar-content {
  margin-top: 48px;
  padding: 0 40px;
  height: calc(100% - 96px);
  .night-mode {
    display: flex;
    justify-content: space-between;
  }
  .toggle-btn {
    display: block;
  }
}
h4 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  &.dark {
    color: #fff;
  }
}
.table {
  margin-top: 16px;
  width: 100%;
  height: calc(100% - 32px);
  &.dark {
    div,
    p {
      color: #fff;
    }
    .table-row {
      border-bottom: 1px solid #fff;
    }
  }
}
.table-thead {
  font-weight: 700;
  text-align: left;
  font-size: 24px;
  padding: 16px 0;
}
.table-body {
  height: calc(100% - 96px);
  overflow: auto;
}
.table-row {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #000;
  p,
  div {
    font-size: 16px;
  }
  p {
    flex: 4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div {
    i {
      cursor: pointer;
    }

    text-align: center;
    flex: 1;
  }
}
input {
  border: none;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
  }
}
::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
  border-radius: 10px;
}
@media screen and(max-width:768px) {
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 70%;
  }
}
</style>