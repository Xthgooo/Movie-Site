import { Button } from "@/components/ui/button";
import { PhoneIcon } from "../app/_assets/PhoneIcon";
import { Emailicon } from "../app/_assets/Emailicon";
import { FooterContentTemplate } from "./FooterContentTemplate";

const Contactinfo = (
  <div className="flex flex-col lg:gap-6 gap-3">
    <div className="contactInfoContainer">
      <Emailicon />
      <div className="contactInfo">
        <p>Email:</p>
        <Button variant="ghost" size="none">
          support@movieZ.com
        </Button>
      </div>
    </div>
    <div className="contactInfoContainer">
      <PhoneIcon />
      <div className="contactInfo">
        <p>Phone:</p>
        <Button variant="ghost" size="none">
          +976 (11) 123-4567
        </Button>
      </div>
    </div>
  </div>
);
const platforms = ["Facebook", "Instagram", "Twitter", "Youtube"];
const Socials = (
  <div className="flex gap-3 lg:flex-row flex-col">
    {platforms.map((social, index) => {
      return (
        <Button variant="ghost" size="none" key={index}>
          {social}
        </Button>
      );
    })}
  </div>
);

export const Footer = () => {
  return (
    <div className="w-screen h-[290px] flex items center justify-center lg:p-10 px-5 pt-10 pb-5 bg-[#4338CA]">
      <div className="w-full h-full flex flex-col md:flex-row justify-between">
        <div>
          <FooterContentTemplate
            Width="fit"
            logo={true}
            content="© 2024 Movie Z. All Rights Reserved."
          />
        </div>
        <div className="flex gap-24">
          <FooterContentTemplate
            Width="174px"
            title="Contact Information"
            content={Contactinfo}
          />
          <FooterContentTemplate
            Width="274px"
            title="Follow us"
            content={Socials}
          />
        </div>
      </div>
    </div>
  );
};
