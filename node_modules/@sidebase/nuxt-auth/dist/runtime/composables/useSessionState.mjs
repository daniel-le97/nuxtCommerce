import { computed } from "vue";
import { useState } from "#imports";
export default () => {
  const data = useState("session:data", () => void 0);
  const hasInitialSession = data.value !== void 0;
  const lastRefreshedAt = useState("session:lastRefreshedAt", () => {
    if (hasInitialSession) {
      return new Date();
    }
    return void 0;
  });
  const loading = useState("session:loading", () => !hasInitialSession);
  const status = computed(() => {
    if (loading.value) {
      return "loading";
    }
    if (data.value) {
      return "authenticated";
    }
    return "unauthenticated";
  });
  return {
    data,
    loading,
    lastRefreshedAt,
    status
  };
};
