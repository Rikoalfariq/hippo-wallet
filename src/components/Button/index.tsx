import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import cx from 'classnames';
import styles from './Button.module.scss';

type TProps = {
  className?: string;
  children?: any;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'solid' | 'outlined' | 'list' | 'icon' | 'selected' | 'notSelected';
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLElement>) => {} | void;
};

const Button: React.FC<TProps> = (props) => {
  const {
    onClick = () => {},
    isLoading,
    className,
    disabled,
    children,
    variant = 'solid',
    ...rest
  } = props;

  return (
    <button
      className={cx(styles.button, className, {
        [styles.disabled]: disabled,
        [styles.loading]: isLoading,
        [styles.solid]: variant === 'solid',
        [styles.outlined]: variant === 'outlined',
        [styles.list]: variant === 'list',
        [styles.icon]: variant === 'icon',
        [styles.selected]: variant === 'selected',
        [styles.notSelected]: variant === 'notSelected'
      })}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
      {isLoading && (
        <LoadingOutlined style={{ color: 'currentColor', fontSize: 16 }} className="ml-2" />
      )}
    </button>
  );
};

export default Button;
