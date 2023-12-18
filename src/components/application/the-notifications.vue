<template>
  <notifications
    classes="custom-notification rounded-lg"
    :duration="2000"
    :width="350"
    position="top right"
  />
</template>

<style lang="scss">
.custom-notification {
  // styling
  margin: 5px;
  padding: 10px;
  font-size: 12px;
  color: #000000;

  // default (blue)
  background: #f5f7fb;
  border: 1px solid #5c82cc;
  color: #00339a;

  // types (green, amber, red)
  &.success {
    background: #edfcf5;
    border: 1px solid #88d1ac;
    color: #47b27d;
  }

  &.warn {
    background: #fff9f4;
    border: 1px solid #ffba75;
    color: #ff8c1a;
  }

  &.error {
    background: #fff5f5;
    border: 1px solid #fa9696;
    color: #e75c5c;
  }
}
</style>
