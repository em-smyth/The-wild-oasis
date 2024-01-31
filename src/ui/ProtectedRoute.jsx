import { styled } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //  1. Load Authenticated User
  const { isLoading, isAuthenticated } = useUser();

  // 2. If no auth user, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show spinner
  if (isLoading) return;
  <FullPage>
    <Spinner />;
  </FullPage>;

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
