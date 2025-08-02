import add1 from "@/images/add_1.png";
import add2 from "@/images/add_2.png";
import add3 from "@/images/add_3.png";
import add4 from "@/images/add_4.png";
import add5 from "@/images/add_5.png";
import { SidebarPoster } from "../SidebarPoster";

export const Sidebar = () => {
  return (
    <aside className="hidden flex-none md:flex flex-col gap-6 h-full w-44">
      <SidebarPoster
        posters={[
          { image: add2, onClick: () => console.log("click") },
          { image: add3, onClick: () => console.log("click") },
        ]}
        delay={8000}
      />
      <SidebarPoster
        title={"Zapraszamy"}
        posters={[
          { image: add5, onClick: () => console.log("click") },
          { image: add4 },
          { image: add3 },
          { image: add2 },
        ]}
      />
      <SidebarPoster
        title={"1% podatku"}
        posters={[
          { image: add1, onClick: () => console.log("click") },
          { image: add4 },
        ]}
        delay={5000}
      />
      <SidebarPoster
        title={"Polecamy"}
        posters={[
          { image: add1, onClick: () => console.log("click") },
          { image: add4 },
        ]}
        delay={7000}
      />
    </aside>
  );
};
