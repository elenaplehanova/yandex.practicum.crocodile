import type { FC, PropsWithChildren } from 'react'

import styles from './AuthLayout.module.scss'

interface AuthLayoutProps {
  title: string
}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({
  children,
  title,
}) => (
  <section className={styles.authSection}>
    <div className={styles.authContainer}>
      <h1>{title}</h1>
      {children}
    </div>
  </section>
)
