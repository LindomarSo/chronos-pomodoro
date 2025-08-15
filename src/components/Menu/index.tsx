import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const nextIconTheme = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  // Usar a configuração lazy
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const localStorageTheme = localStorage.getItem("theme") as AvailableThemes || "dark";
    return localStorageTheme;
  });

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme as AvailableThemes;
    });
  }

  // // É usado toda vez que o componente é renderizado
  // useEffect(() => {
  //   console.log("Sem dependência", Date.now());
  // });

  // // Executa apenas quando o react monta o componente na tela pela primeira vez
  // useEffect(() => {
  //   console.log("useEffect com array deps vazio", Date.now());
  // }, []);

  //  Executa sempre que a variável de estado 'theme' for alterada
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={`${styles.menu}`}>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para Home"
        title="Home"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para Histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleThemeChange}
      >
        {nextIconTheme[theme]}
      </a>
    </nav>
  );
}
