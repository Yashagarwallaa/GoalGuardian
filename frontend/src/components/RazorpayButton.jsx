import React, { useEffect } from 'react';

const RazorpayButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.razorpay.com/static/widget/subscription-button.js";
    script.setAttribute('data-subscription_button_id', 'pl_OYFSrHBHNoaYJU');
    script.setAttribute('data-button_theme', 'brand-color');
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <form>
      {/* The button will be injected here by the script */}
    </form>
  );
};

export default RazorpayButton;
