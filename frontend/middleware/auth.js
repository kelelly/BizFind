import { getAuthToken } from '~/utils/auth'; // Utility to fetch the auth token

// Middleware to check if the user is authenticated
export default function checkAuthenticated({ store, redirect }) {
  const token = getAuthToken(); // Retrieve the authentication token
  if (!token && !store.state.auth.isLoggedIn) {
    return redirect('/login'); // Redirect to login page if not authenticated
  }
}

// Middleware to check if the user has an admin role
export function checkAdmin({ store, redirect }) {
  const token = getAuthToken(); // Retrieve the authentication token
  if (!store.state.auth.isLoggedIn || store.state.auth.role !== 'admin') {
    return redirect('/403'); // Redirect to a 403 error page if unauthorized
  }
}

// Middleware to check if the user owns the business
export function checkBusinessOwner({ store, route, redirect }) {
  const businessId = route.params.businessId; // Extract the business ID from the route params
  const isOwner = store.state.business.ownedBusinesses.includes(businessId); // Check ownership

  if (!store.state.auth.isLoggedIn || !isOwner) {
    return redirect('/403'); // Redirect to a 403 error page if unauthorized
  }
}
