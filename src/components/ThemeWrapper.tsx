import { ThemeProvider } from "next-themes";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeWrapper;
