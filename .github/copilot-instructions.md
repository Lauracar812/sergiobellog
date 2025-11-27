# Copilot Instructions for sergiobellog.com

## Project Overview
This is a React + Vite web application for Sergio Bellog's professional portfolio and services site. The project uses Tailwind CSS for styling and includes a sophisticated visual editing plugin system for iframe-based editing environments (Hostinger Horizons integration).

**Key Tech Stack:**
- React 19, Vite 4.4, Tailwind CSS 3.4
- Radix UI components (alert-dialog, checkbox, dropdown-menu, tabs, toast, etc.)
- Framer Motion for animations
- Babel tools for AST manipulation in plugins
- Path alias: `@/` maps to `src/`

---

## Architecture & Key Components

### 1. **Plugin System** (Critical for Understanding Build Process)
Located in `plugins/`, this project uses custom Vite plugins that inject runtime behavior in development:

- **`vite-plugin-edit-mode.js`**: Injects inline editing capabilities. Injects `edit-mode-script.js` and editor styles from `visual-editor-config.js` into the HTML during dev server.
- **`vite-plugin-selection-mode.js`**: Injects selection mode script for interactive UI component selection in development environments.
- **`vite-plugin-iframe-route-restoration.js`**: Handles iframe route persistence when embedded in parent applications (Hostinger Horizons). Manages postMessage communication with parent frame.
- **`vite-plugin-react-inline-editor.js`**: Additional inline React component editor plugin.

**Pattern to follow:** Vite plugins use `transformIndexHtml()` hook to inject scripts/styles. All plugins only apply in `serve` mode.

### 2. **Component Structure**
- `src/components/ui/`: Radix UI wrapped components using CVA (class-variance-authority) for variant styling. Example: `button.jsx` uses `buttonVariants` CVA object.
- `src/components/`: Feature components (Header, HeroSection, etc.). Use Framer Motion for animations.
- **Toast System**: Custom toast implementation using Radix UI toast + custom hook `use-toast.js`.

### 3. **Styling Approach**
- Tailwind CSS with custom color system using CSS variables (`--primary`, `--secondary`, etc.)
- HSL color values injected via CSS variables (defined in theme extension)
- Tailwind `darkMode: ['class']` enabled for class-based dark mode
- Container centered with `2xl: 1400px` max-width

### 4. **Build Tools**
- `tools/generate-llms.js`: Pre-build script that extracts metadata from routes/components and generates `public/llms.txt` for LLM context. Runs before `vite build`.
- Uses Babel parser + traverse for AST analysis to extract Helmet metadata, routes, and component descriptions.

---

## Admin System (NEW)

### Overview
A complete content management system for the landing page using React Router and localStorage.

### Features
- **Authentication:** Simple login with user/password (`admin` / `admin123`)
- **Dashboard:** Central control panel for managing sections
- **Content Editor:** Real-time editor for HeroSection with image upload
- **Storage:** localStorage-based (no backend required)
- **Persistence:** Changes persist between sessions

### Structure
```
src/
├── hooks/useAdminContent.js          # Content state management
├── pages/
│   ├── AdminLogin.jsx                # Login page (/admin)
│   └── AdminDashboard.jsx            # Admin dashboard (/admin/dashboard)
├── components/
│   ├── admin/HeroSectionEditor.jsx   # Editor with live preview
│   └── ProtectedRoute.jsx            # Route protection wrapper
├── utils/auth.js                     # Authentication logic
```

### Routes
- `/admin` - Login page
- `/admin/dashboard` - Protected admin panel (redirects to login if not authenticated)
- `/` - Public landing

### Key Functions

**useAdminContent hook:**
```javascript
const { content, isLoading, saveContent, updateSection, resetContent } = useAdminContent();
```

**Content Structure:**
```json
{
  "heroSection": {
    "description": "Main text",
    "backgroundImageDesktop": "base64-image",
    "backgroundImageMobile": "base64-image",
    "logoImage": "base64-image",
    "buttonText": "Button Label"
  }
}
```

### Image Upload
- Supports any format and size
- Converted to Base64 for localStorage
- Separate versions for Desktop and Mobile
- Real-time preview in editor

### How to Modify
- Change credentials in `src/utils/auth.js` (`DEFAULT_ADMIN` object)
- Add new sections: Create new editor component in `src/components/admin/`
- Extend dashboard: Add menu items in `src/pages/AdminDashboard.jsx`

---

## Developer Workflows (Updated)

### **Development**
```bash
npm run dev
# Starts dev server with Vite at http://localhost:3000 (--host :: for network access)
# Enables all plugins: edit-mode, selection-mode, iframe-route-restoration
```

### **Build**
```bash
npm run build
# 1. Runs: node tools/generate-llms.js (generates public/llms.txt, silently fails if issues)
# 2. Runs: vite build (production bundle, plugins disabled)
```

### **Preview**
```bash
npm run preview
# Serves built output on http://localhost:3000 for testing before deployment
```

---

## Project-Specific Patterns & Conventions

### **Import Aliases**
Use `@/` for `src/` paths:
```jsx
import Header from '@/components/Header';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
```

### **Component Patterns**
1. **UI Components** use CVA + Radix UI + `clsx`/`cn()`:
   ```jsx
   const buttonVariants = cva('...', { variants: { ... } });
   export const Button = React.forwardRef((props, ref) => <Comp ... />);
   ```

2. **Feature Components** use Framer Motion animations:
   ```jsx
   <motion.header initial={{ y: -100 }} animate={{ y: 0 }} />
   ```

3. **Toast Usage**:
   ```jsx
   const { toast } = useToast();
   toast({ title: "...", description: "..." });
   ```

### **Helmet (SEO)**
Use React Helmet for head management:
```jsx
<Helmet>
  <title>Sergio Bellog - Consultoría y Desarrollo Web</title>
  <meta name="description" content="..." />
</Helmet>
```

### **Iframe Integration** (Hostinger Horizons)
The app is embeddable in iframes with:
- Automatic route persistence via `sessionStorage`
- Parent origin validation (Hostinger whitelist)
- postMessage communication for error handling (Vite errors, runtime errors, console errors)

**Important:** Do NOT remove or modify `vite-plugin-iframe-route-restoration.js` without understanding parent frame communication.

---

## Integration Points & External Dependencies

- **Hostinger Horizons**: Visual builder that embeds this app. Expects postMessage events (`horizons-vite-error`, `horizons-runtime-error`, `horizons-console-error`, `route-changed`).
- **Radix UI**: Provides accessible component primitives (Dialog, Dropdown, Toast, etc.).
- **Framer Motion**: Used for header animations, menu animations.
- **Tailwind CSS**: Complete styling system; extend in `tailwind.config.js`.

---

## File Structure Quick Reference

- `vite.config.js`: Main config with all 4 plugins registered + error handlers
- `src/App.jsx`: Entry point (Header + HeroSection + Toaster)
- `src/index.css`: Tailwind imports + custom CSS variables (check for theme definitions)
- `tailwind.config.js`: Color system, theme extensions, dark mode config
- `tools/generate-llms.js`: LLM metadata extraction (runs before build)
- `public/llms.txt`: Generated metadata file (do NOT edit manually)
- `.nvmrc` / `.version`: Node version tracking

---

## When Modifying...

- **Adding UI Components**: Follow CVA + Radix UI pattern in `src/components/ui/`
- **Styling**: Extend `tailwind.config.js` theme, use CSS variables for colors
- **Routes/Features**: Extract Helmet metadata for LLM generation (will be auto-added to `public/llms.txt`)
- **Plugins**: Test in dev mode with `npm run dev`; verify iframe communication works if modifying iframe plugin
- **Build Process**: Test with `npm run build` to ensure `generate-llms.js` runs correctly

---

## Quick Debugging Tips

1. **Vite Errors in iframe**: Check browser console for postMessage events to parent frame
2. **Styling issues**: Verify Tailwind content paths include your files; check CSS variable definitions
3. **Plugin issues**: Vite dev logs will show plugin hook execution in console
4. **Toast not appearing**: Ensure `<Toaster />` is rendered in `App.jsx` and `useToast()` hook is used correctly
