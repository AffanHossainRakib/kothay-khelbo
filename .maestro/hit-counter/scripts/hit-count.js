// Reads the current hit count straight from the backend, so the flow knows
// which number to expect on the page before and after the click.
const response = http.get(`${API_URL}/hits`);

if (!response.ok) {
  throw new Error(`hit-count failed: ${response.status} ${response.body}`);
}

const count = json(response.body).data.count;

output.count = count;
output.nextCount = count + 1;
