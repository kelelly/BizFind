// Middleware to check if the user is authenticated
export function checkAuthenticated({ store, redirect }) {
  // Check if the user is logged in
  const isLoggedIn = store.state.auth && store.state.auth.isLoggedIn;

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    return redirect('/login');
  }
}

// Middleware to check if the user has an admin role
export function checkAdmin({ store, redirect }) {
  // Check if the user is logged in and has the admin role
  const isLoggedIn = store.state.auth && store.state.auth.isLoggedIn;
  const isAdmin = store.state.auth && store.state.auth.role === 'admin';

  if (!isLoggedIn || !isAdmin) {
    // Redirect to the 403 error page if the user is not authorized
    return redirect('/403');
  }
}

// Middleware to check if the user owns the business
export function checkBusinessOwner({ store, route, redirect }) {
  // Check if the user is logged in
  const isLoggedIn = store.state.auth && store.state.auth.isLoggedIn;
  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    return redirect('/login');
  }

  // Check if the user owns the business
  const businessId = route.params.businessId; // Assume the business ID is in the route params
  const ownedBusinesses = store.state.business && store.state.business.ownedBusinesses;
  const isOwner = ownedBusinesses && ownedBusinesses.includes(businessId);

  if (!isOwner) {
    // Redirect to the 403 error page if the user does not own the business
    return redirect('/403');
  }
}
