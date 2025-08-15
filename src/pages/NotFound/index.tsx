import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { MainTemplate } from "../../components/templates/MainTemplate";

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <h1>Página não encontrada</h1>
          <p>Desculpe, mas a página que você está procurando não existe.</p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
