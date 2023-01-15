<template>
  <div class="flex">
    <div class="item" />
    <div class="item" />
    <div class="item" />
    <div class="item" />
    <div class="item" />
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

$color-1: #ddd8b8;
$color-2: #b3cbb9;
$color-3: #84a9c0;
$color-4: #6a66a3;
$color-5: #58548e;

// $color: $color-1, $color-2, $color-3, $color-4, $color-5;
$color: #49b8e5, #1e98d4, #2a92d0, #3a88c8, #507cbe;

@mixin anim($i) {
  $y: ($i + 5) * 10;

  @keyframes right-#{$i} {
    0% {
      transform: translateY(#{-$y}px);
    }
    100% {
      transform: translateY(#{$y}px);
    }
  }
}

.item {
  width: 20px;
  height: 20px;
  margin: 10px;
  list-style-type: none;
  transition: 0.5s all ease;
}

@for $i from 1 through 5 {
  .item:nth-child(#{$i}) {
    @include anim($i);
    animation: right-#{$i} 1s infinite alternate;
    background-color: nth($color, $i);
    animation-delay: 100ms * $i;
  }
}

</style>
