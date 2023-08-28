import styles from "./Button.module.css";

const Button = ({ label, onClick, color='#fff', backgroundColor='#000', outline, type, disabled }) => {
  let className = styles.button;

  if (outline) className = className + ' ' + styles.outline;

  return (
    <button
      className={className}
      onClick={onClick}
      style={{ color, backgroundColor: outline ? 'inherit' : backgroundColor }}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button;
