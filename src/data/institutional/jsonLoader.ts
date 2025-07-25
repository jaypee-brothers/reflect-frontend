// Utility to load JSON mock data (Phase 2)
export async function loadJSONData<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}
