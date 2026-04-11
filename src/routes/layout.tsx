import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
