import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function RouteTransitionIndicator() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 overflow-hidden"
      role="status"
      aria-label="Loading page"
    >
      <div
        className="h-full w-1/3 bg-primary"
        style={{
          animation: "route-progress 1s ease-in-out infinite",
          boxShadow: "0 0 12px oklch(0.78 0.16 220 / 0.7)",
        }}
      />
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Branded progress bar while a route chunk loads (slow mobile networks).
    defaultPendingComponent: RouteTransitionIndicator,
  });

  return router;
};
