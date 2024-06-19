import scss from './Layout.module.scss';

export default function Layout({ children }) {
  return <main className={scss.wrapper}>{children}</main>;
}
