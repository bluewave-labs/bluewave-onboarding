 
  // Define color constants
  const iconColor = '#667085';
  const hoverColor = 'orange';
  const textColor = '#344054';
  const borderColor = '#FFD8C7';
  const buttonBackgroundColor = '#FFFAFA';
  
  export const activityButtonStyles = {
    
    button: {
      backgroundColor: buttonBackgroundColor,
      color: textColor,
      border: '1px solid ' + borderColor,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      textTransform: 'none',
      padding: '1.3rem 3rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: 'fit-content',
      boxShadow: 'none',
      borderRadius: '10px',
      gap: '1rem',
      width: '100%',
    ':hover': {
        backgroundColor: hoverColor
        },
    },
    icon: { 
        color: iconColor, 
        fontSize: '2rem' }
  };
  