import { Container } from "../../Container";
import { Logo } from "../../Logo";
import { Menu } from "../../Menu";
import { Footer } from "../../Footer";
import type React from "react";

type MainTemplateProps = {
    children: React.ReactNode;
}

export function MainTemplate({ children }: MainTemplateProps) {
      return (
        <>
          <Container>
            <Logo />
          </Container>
          <Container>
            <Menu />
          </Container>

            {children}
    
          <Container>
            <Footer />
          </Container>
        </>
      );
    
}