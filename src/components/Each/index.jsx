import { Children } from "react";

export default function Each({ render, of }) {
  return Children.toArray(of?.map((item, index) => render(item, index)));
}
