import { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/dashboard.css';

/**
 * Wrapper component that scopes dashboard styles
 * This ensures that the dashboard styles don't affect the home page
 * Only imports the styles from the design reference
 */
export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add a class to the body to scope dashboard styles
    document.body.classList.add('dashboard-active');
    
    return () => {
      // Remove the class when component unmounts
      document.body.classList.remove('dashboard-active');
    };
  }, []);

  return (
    <div className="dashboard-scope min-h-screen">
      {children}
    </div>
  );
}

