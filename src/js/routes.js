import {asyncComponent} from "js/lib/react";

const Index = asyncComponent(() =>
  import("js/components/landing/Index").then(module => module.default));

export default [
  {
    path: "/",
    component: Index,
  },
];
