const PlaneIcon = ({ width = 32, height = 32, className = "", ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M20.56 3.44C21.15 4.03 21.15 4.97 20.56 5.56L5.56 20.56C4.97 21.15 4.03 21.15 3.44 20.56C2.85 19.97 2.85 19.03 3.44 18.44L18.44 3.44C19.03 2.85 19.97 2.85 20.56 3.44M14.5 6L16.5 8L8.5 16L6.5 14L14.5 6M20.54 3.46L21.95 4.87L16.13 10.69L14.72 9.28L20.54 3.46Z"/>
    </svg>
  );
};

export default PlaneIcon;