import React, { ReactNode, HTMLAttributes } from 'react';
import styles from './Container.module.css';

export interface ContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  /**
   * Content to be displayed inside the container
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * HTML element type to render
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
}

/**
 * Container component that centers content and applies responsive padding
 * Max-width: 1200px
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const classNames = [styles.container, className].filter(Boolean).join(' ');

  return <Component className={classNames} {...props}>{children}</Component>;
};
