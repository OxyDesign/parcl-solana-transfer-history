import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { NavigationTabsProps } from './NavigationTabs.types';
import styles from './NavigationTabs.module.scss';

export const NavigationTabs: FC<NavigationTabsProps> = ({ className, tabs, ...props }) => {
  const router = useRouter();

  return (
    <nav {...props} className={cn(styles.root, className)}>
      <ul className={styles.list}>
        {tabs.map(({ name, path }) => (
          <li className={styles.listItem}>
            {router.asPath === path ? (
              <span className={cn(styles.link, styles.linkDisabled)}>{name}</span>
            ) : (
              <Link className={cn(styles.link, styles.linkEnabled)} href={path}>
                {name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
