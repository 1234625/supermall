<template>
  <div class="param" v-if="Object.keys(goodparam).length !== 0">
    <div class="rule">
      <div class="table">
        <table>
          <tr v-for="(item, index) in goodparam.rule.tables[0]" :key="index">
            <td v-for="(td, tdindex) in item" :key="tdindex">{{ td }}</td>
          </tr>
        </table>
      </div>
      <span class="disc">{{ goodparam.rule.disclaimer }}</span>
    </div>

    <div class="info">
      <table>
        <tr v-for="(item, index) in goodparam.info" :key="index">
          <td class="key">{{ item.key }}</td>
          <td class="value">{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailParamInfo",
  props: {
    goodparam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.param {
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
table {
  width: 100%;
  margin-left: 10px;
}
table tr {
  height: 42px;
}
td {
  border-bottom: 1px solid #ebe9e9;
}
.table td:nth-child(1) {
  width: 80px;
}
.disc {
  font-size: 12px;
}

.key {
  width: 80px;
}
.value {
  color: var(--color-height-text);
}
</style>
