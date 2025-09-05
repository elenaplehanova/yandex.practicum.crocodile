import type { FC, PropsWithChildren } from 'react'

import styles from './AuthTemplate.module.scss'

interface AuthTemplateProps {
  title: string
}

export const AuthTemplate: FC<PropsWithChildren<AuthTemplateProps>> = ({
  children,
  title,
}) => (
  <section className={styles.container}>
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      {children}
    </div>
  </section>
)
