import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "react-oidc-context";
import App from './App.tsx'
import './styles/main.css'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_PQdtjW0uq",
  client_id: import.meta.env.VITE_AWS_CLIENT_ID,
  redirect_uri: "http://localhost:8080/callback",
  response_type: "code",
  scope: "email openid phone profile",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)