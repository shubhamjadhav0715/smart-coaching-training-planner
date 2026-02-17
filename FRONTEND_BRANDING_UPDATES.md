# Frontend Branding Updates for AthleteIQ

## Files Updated ✅

1. **frontend/public/index.html** - Page title and meta tags
2. **frontend/src/pages/Login.js** - Login page header
3. **frontend/src/pages/Register.js** - Registration page header
4. **frontend/src/pages/Admin/Dashboard.js** - Admin dashboard header
5. **frontend/package.json** - Package name

## Manual Updates Needed for Dashboard Headers

### Coach Dashboard (`frontend/src/pages/Coach/Dashboard.js`)

**Line 137 - Change from:**
```jsx
<h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>
```

**To:**
```jsx
<h1 className="text-2xl font-bold text-blue-600">AthleteIQ</h1>
<span className="ml-3 text-sm text-gray-600">Coach Dashboard</span>
```

**Add footer before closing `</div>` (around line 410):**
```jsx
<div className="mt-8 text-center">
  <p className="text-sm text-gray-500">
    © 2024 AthleteIQ - Smart Coaching Platform
  </p>
</div>
```

---

### Athlete Dashboard (`frontend/src/pages/Athlete/Dashboard.js`)

**Find the header section (similar to Coach) and change:**
```jsx
<h1 className="text-2xl font-bold text-gray-900">Athlete Dashboard</h1>
```

**To:**
```jsx
<h1 className="text-2xl font-bold text-blue-600">AthleteIQ</h1>
<span className="ml-3 text-sm text-gray-600">Athlete Dashboard</span>
```

**Add footer before closing `</div>`:**
```jsx
<div className="mt-8 text-center">
  <p className="text-sm text-gray-500">
    © 2024 AthleteIQ - Smart Coaching Platform
  </p>
</div>
```

---

## Toast Messages

### Update Success Messages

**In all dashboard files, change toast messages:**

**Login success:**
```javascript
// From:
toast.success('Login successful!');

// To:
toast.success('Welcome to AthleteIQ!');
```

**Registration success:**
```javascript
// From:
toast.success('Registration successful!');

// To:
toast.success('Welcome to AthleteIQ!');
```

---

## Component Updates (Optional but Recommended)

### Create Shared Header Component

Create `frontend/src/components/Header.js`:

```jsx
import React from 'react';

const Header = ({ title, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">AthleteIQ</h1>
            <span className="ml-3 text-sm text-gray-600">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button onClick={onLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

### Create Shared Footer Component

Create `frontend/src/components/Footer.js`:

```jsx
import React from 'react';

const Footer = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        © 2024 AthleteIQ - Smart Coaching Platform
      </p>
    </div>
  );
};

export default Footer;
```

---

## Quick Find & Replace Guide

Use your code editor's find & replace feature:

### Find & Replace Patterns:

1. **Page Titles:**
   - Find: `Smart Coaching & Training`
   - Replace: `AthleteIQ`

2. **Success Messages:**
   - Find: `'Login successful!'`
   - Replace: `'Welcome to AthleteIQ!'`
   
   - Find: `'Registration successful!'`
   - Replace: `'Welcome to AthleteIQ!'`

3. **Dashboard Headers:**
   - Find: `<h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>`
   - Replace: 
   ```jsx
   <h1 className="text-2xl font-bold text-blue-600">AthleteIQ</h1>
   <span className="ml-3 text-sm text-gray-600">Coach Dashboard</span>
   ```

4. **Similar for Athlete Dashboard**

---

## Verification Checklist

After making changes, verify:

- [ ] Login page shows "AthleteIQ" header
- [ ] Register page shows "AthleteIQ" header
- [ ] Admin dashboard shows "AthleteIQ" in nav
- [ ] Coach dashboard shows "AthleteIQ" in nav
- [ ] Athlete dashboard shows "AthleteIQ" in nav
- [ ] Browser tab shows "AthleteIQ - Smart Coaching Platform"
- [ ] All footers show "© 2024 AthleteIQ"
- [ ] Toast messages say "Welcome to AthleteIQ!"

---

## Summary of Changes

**Completed:**
- ✅ HTML title and meta tags
- ✅ Login page branding
- ✅ Register page branding
- ✅ Admin dashboard branding
- ✅ Package.json name

**Pending (Manual):**
- ⏳ Coach Dashboard header (line 137)
- ⏳ Coach Dashboard footer (end of file)
- ⏳ Athlete Dashboard header
- ⏳ Athlete Dashboard footer

**Optional Enhancements:**
- 💡 Create shared Header component
- 💡 Create shared Footer component
- 💡 Add AthleteIQ logo image
- 💡 Update favicon

---

**All branding updates maintain the professional blue (#2563eb) color scheme!** 🎨
