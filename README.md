Problem Statement
Communities frequently face issues such as potholes, water leakages, damaged streetlights, waste management concerns, and public infrastructure challenges. Reporting these issues is often fragmented, difficult to track, and lacks transparency. CivicPulse solves this by enabling citizens to report, validate, track, prioritize, and resolve local civic issues through a transparent web platform. The solution encourages accountability, faster response, and community participation by connecting citizen reports with municipal dashboards, triage tools, map-based visibility, and repair crew planning.

Solution Overview
CivicPulse is a civic issue reporting and municipal response platform. Citizens can report problems with location, category, description, and media. Other citizens can view and verify nearby issues. Municipal managers can see active complaints, prioritize issues based on severity and vulnerability, check department work conflicts, inspect satellite ground movement, detect water leaks through sound analysis, and plan maintenance crew routes. The app turns scattered local complaints into a structured workflow from report to resolution.

Key Features
1. Citizen Portal: Users can sign in as citizens, report issues, choose categories like potholes, water leakage, garbage, streetlights, and public infrastructure, attach images/videos, and select the issue location on the live map.
2. Map and Issues View: Citizens and managers can see reported issues as colored markers on the map. Categories are visually separated so users can quickly identify road, water, waste, and lighting problems.
3. Issue Verification: Citizens can verify issues reported by others. This helps validate real problems and improves trust in the complaint data.
4. Municipal Manager Dashboard: Managers can view unresolved, stopped, and resolved issues, inspect active tickets, and mark completed issues as resolved.
5. Priority Dispatch: The app ranks issues using risk/severity and community impact. High-risk problems such as major leaks or dangerous potholes are prioritized first.
6. Department Work Check: The system compares planned work across departments, such as water pipeline work and road repair, to avoid repeated digging and wasted public money.
7. Satellite Ground Check: Managers can inspect ground movement and subsidence risk for roads, bridges, tunnels, and other civic infrastructure using a simulated InSAR-style view.
8. Water Leak Sound Lab: Users can upload or test sample audio recordings. The app analyzes simulated acoustic patterns and can create a water leakage ticket when leak-like sound is detected.
9. Maintenance Crew Route Planning: The manager can generate repair routes. The map shows crew paths and numbered stops. The route panel shows how many people are in each crew, how many issues they will resolve, which issue they will fix first, which comes next, arrival time, expected resolution time, and priority reason.
10. Gamification/Profile: Citizens receive points and badges for reporting, verifying, and helping resolve civic issues, encouraging participation.

Technologies Used
React 19 for the frontend UI.
TypeScript for safer frontend and backend code.
Vite for frontend development and production bundling.
Express.js for backend API routes.
Node.js for server runtime.
Tailwind CSS for styling.
Leaflet with OpenStreetMap/CARTO map tiles for interactive maps.
Lucide React for UI icons.
MongoDB support with local JSON fallback for persistence.
Google Gemini API via @google/genai for AI-assisted triage, routing, and forecasting where configured.

Google Technologies Utilized
Google Gemini API through the @google/genai SDK for AI-assisted civic triage, route optimization, and budget forecasting.
Google Cloud Run is the recommended deployment target because it can host the Node/React full-stack app and scale to zero for low-traffic/free-tier-friendly usage.
Google Cloud Build can build the app directly from source during Cloud Run deployment.

Open Source Libraries/APIs Used
React: UI framework.
Vite: frontend build tool.
Express.js: backend web server.
Leaflet: interactive map rendering.
OpenStreetMap map data and CARTO tile styling: map display layer.
Tailwind CSS: utility-first styling.
Lucide React: icon library.
MongoDB Node.js driver: database connectivity.
dotenv: environment variable loading.
esbuild/tsx: TypeScript build and runtime tooling.
