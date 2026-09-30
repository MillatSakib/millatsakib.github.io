"use client";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Category={_id:string;id:string;label:string};
type Content={categories:Category[]; projects:any[]; profileImage:string|null};
const input="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-amber-300";
async function call(url:string, options?:RequestInit){
 const r=await fetch(url,{...options,cache:"no-store"});
 const type=r.headers.get("content-type")||"";
 const data=type.includes("application/json")?await r.json():null;
 if(!r.ok) throw new Error(data?.error||`Request failed (${r.status}). Restart the dev server if routes were recently added.`);
 return data;
}
export default function AdminDashboard(){
 const [logged,setLogged]=useState<boolean|null>(null); const [content,setContent]=useState<Content>({categories:[],projects:[],profileImage:null});
 const load=async()=>{try{const [c, p, prof]=await Promise.all([call("/api/admin/categories"), call("/api/admin/projects"), call("/api/admin/profile")]); setContent({categories:c, projects:p, profileImage:prof.url||null}); setLogged(true);}catch{setLogged(false);}};
 // Authentication is checked once when the dashboard mounts.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{void load()},[]);
 if(logged===null) return <main className="min-h-screen bg-[#070b16]"/>;
 if(!logged) return <Login onSuccess={load}/>;
 const refresh=()=>load();
 return <main className="min-h-screen bg-[#070b16] px-4 py-10 text-slate-100 sm:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-amber-200">Portfolio CMS</p><h1 className="mt-2 font-display text-4xl font-bold">Admin dashboard</h1><p className="mt-2 text-slate-400">Manage the content shown on your portfolio.</p></div><button onClick={async()=>{await call('/api/auth/logout',{method:'POST'});setLogged(false)}} className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-amber-200">Log out</button></div><div className="mt-10 grid gap-6 lg:grid-cols-2"><ProfileImageManager currentUrl={content.profileImage} refresh={refresh}/><CategoryManager categories={content.categories} refresh={refresh}/><SkillManager categories={content.categories} refresh={refresh}/><ProjectManager projects={content.projects} refresh={refresh}/></div></div></main>;
}
function Login({onSuccess}:{onSuccess:()=>void}){const [username,setUsername]=useState("");const [password,setPassword]=useState("");const [showPassword,setShowPassword]=useState(false);const [error,setError]=useState(""); return <main className="flex min-h-screen items-center justify-center bg-[#070b16] px-4 text-slate-100"><form className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.05] p-8" onSubmit={async(e)=>{e.preventDefault();try{await call('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});onSuccess()}catch(err){setError((err as Error).message)}}}><p className="text-xs font-bold uppercase tracking-[.3em] text-amber-200">Private area</p><h1 className="mt-3 font-display text-3xl font-bold">Admin login</h1>{error&&<p className="mt-4 text-sm text-rose-300">{error}</p>}<input className={`${input} mt-7`} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required/><div className="relative mt-3"><input className={`${input} pr-14`} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" onClick={()=>setShowPassword(value=>!value)} className="absolute inset-y-0 right-3 my-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-amber-200" aria-label={showPassword?"Hide password":"Show password"} title={showPassword?"Hide password":"Show password"}>{showPassword?<FaEyeSlash aria-hidden="true"/>:<FaEye aria-hidden="true"/>}</button></div><button className="mt-5 w-full rounded-xl bg-amber-300 px-4 py-3 font-bold text-slate-950">Sign in</button></form></main>}
function Panel({title,children}:{title:string;children:React.ReactNode}){return <section className="rounded-3xl border border-white/10 bg-white/[.045] p-6"><h2 className="font-display text-xl font-bold">{title}</h2>{children}</section>}
function CategoryManager({categories,refresh}:{categories:Category[];refresh:()=>void}){const [label,setLabel]=useState(""); return <Panel title="Skill categories"><form className="mt-5 flex gap-2" onSubmit={async e=>{e.preventDefault();await call('/api/admin/categories',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:label,label})});setLabel("");refresh()}}><input className={input} placeholder="e.g. Design" value={label} onChange={e=>setLabel(e.target.value)} required/><button className="rounded-xl bg-amber-300 px-4 font-bold text-slate-950">Add</button></form><ul className="mt-5 space-y-2">{categories.map(c=><li key={c._id} className="flex items-center justify-between rounded-xl bg-slate-950/50 px-4 py-3"><span>{c.label}</span><button onClick={async()=>{await call(`/api/admin/categories/${c._id}`,{method:'DELETE'});refresh()}} className="text-xs text-rose-300">Delete</button></li>)}</ul></Panel>}
function SkillManager({ categories, refresh }: { categories: Category[]; refresh: () => void }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const iconKey = "upload";
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Panel title="Add a skill">
      <form
        className="mt-5 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setStatus("");
            setIsUploading(true);
            if (!file) throw new Error("Choose an icon image");
            const fd = new FormData();
            fd.append("file", file);
            const media = await call("/api/admin/media", { method: "POST", body: fd });
            await call("/api/admin/skills", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, categoryId, iconKey, iconUrl: media.url }),
            });
            setName("");
            setFile(null);
            setPreview("");
            setStatus("Skill added successfully!");
            refresh();
          } catch (err) {
            setStatus((err as Error).message);
          } finally {
            setIsUploading(false);
          }
        }}
      >
        <input className={input} placeholder="Skill name" value={name} onChange={(e) => setName(e.target.value)} required />
        <select className={input} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            if (f) setPreview(URL.createObjectURL(f));
            else setPreview("");
          }}
          className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
          required
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="h-16 w-16 rounded-xl object-cover" />
          </div>
        )}
        <button
          disabled={isUploading}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
        >
          {isUploading && (
            <svg className="h-5 w-5 animate-spin text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isUploading ? "Uploading..." : "Add skill"}
        </button>
        {status && <p className="text-sm text-amber-100">{status}</p>}
      </form>
    </Panel>
  );
}
function ProjectManager({ projects, refresh }: { projects: any[]; refresh: () => void }) {
  const [form, setForm] = useState({ _id: "", title: "", description: "", techStack: "", live: "", repo: "", position: "" });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const isEditing = !!form._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isEditing && !file) throw new Error("Choose a project image");
      setStatus(isEditing ? "Updating..." : "Uploading...");
      let imageSrc;
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const media = await call("/api/admin/media", { method: "POST", body: fd });
        imageSrc = media.url;
      }
      
      const payload = {
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(",").map((x) => x.trim()).filter(Boolean),
        position: form.position ? parseInt(form.position, 10) : 0,
        links: [
          form.live && { type: "live", url: form.live, label: "Live site" },
          form.repo && { type: "repo", url: form.repo, label: "Repository" },
        ].filter(Boolean),
        ...(imageSrc && { imageSrc })
      };

      if (isEditing) {
        await call(`/api/admin/projects/${form._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await call("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      
      setStatus(`Project ${isEditing ? 'updated' : 'added'} successfully`);
      setForm({ _id: "", title: "", description: "", techStack: "", live: "", repo: "", position: "" });
      setFile(null);
      refresh();
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  return (
    <Panel title={isEditing ? "Edit project" : "Upload a project"}>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input className={input + " flex-1"} placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className={input + " w-24"} type="number" placeholder="Pos (0)" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
        </div>
        <textarea className={input} placeholder="Short description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input className={input} placeholder="Tech stack, comma separated" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
        <input className={input} placeholder="Live URL (optional)" type="url" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
        <input className={input} placeholder="Repository URL (optional)" type="url" value={form.repo} onChange={(e) => setForm({ ...form, repo: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-semibold file:text-slate-950" />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950">{isEditing ? "Update project" : "Upload project"}</button>
          {isEditing && (
            <button type="button" onClick={() => { setForm({ _id: "", title: "", description: "", techStack: "", live: "", repo: "", position: "" }); setFile(null); setStatus(""); }} className="rounded-xl border border-white/10 px-5 py-3 hover:border-amber-200">Cancel</button>
          )}
        </div>
        {status && <p className="text-sm text-amber-100">{status}</p>}
      </form>
      <ul className="mt-5 space-y-2">
        {projects.map((p) => (
          <li key={p._id} className="flex items-center justify-between rounded-xl bg-slate-950/50 px-4 py-3">
            <span>{p.position !== undefined ? `${p.position}. ` : ''}{p.title}</span>
            <div className="flex gap-3">
              <button onClick={() => {
                const liveLink = p.links?.find((l: any) => l.type === 'live');
                const repoLink = p.links?.find((l: any) => l.type === 'repo');
                setForm({
                  _id: p._id,
                  title: p.title,
                  description: p.description,
                  techStack: p.techStack?.join(", ") || "",
                  live: liveLink?.url || "",
                  repo: repoLink?.url || "",
                  position: p.position !== undefined ? String(p.position) : ""
                });
                setFile(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="text-xs text-amber-200">Edit</button>
              <button onClick={async () => { await call(`/api/admin/projects/${p._id}`, { method: "DELETE" }); refresh(); }} className="text-xs text-rose-300">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
function ProfileImageManager({ currentUrl, refresh }: { currentUrl: string | null; refresh: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  return (
    <Panel title="Profile Picture">
      <div className="mt-5 space-y-4">
        {currentUrl && (
          <div className="flex items-center gap-4">
            <img src={currentUrl} alt="Current profile" className="h-20 w-20 rounded-2xl object-cover" />
            <p className="text-sm text-slate-400">Current profile picture</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            if (f) setPreview(URL.createObjectURL(f));
            else setPreview("");
          }}
          className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
        />
        {preview && (
          <div className="flex items-center gap-3">
            <img src={preview} alt="Preview" className="h-20 w-20 rounded-2xl object-cover" />
            <p className="text-sm text-slate-400">New photo preview</p>
          </div>
        )}
        <button
          disabled={isUploading || !file}
          onClick={async () => {
            if (!file) return;
            try {
              setStatus("");
              setIsUploading(true);
              const fd = new FormData();
              fd.append("file", file);
              const media = await call("/api/admin/media", { method: "POST", body: fd });
              await call("/api/admin/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: media.url }) });
              setFile(null);
              setPreview("");
              setStatus("Profile picture updated!");
              refresh();
            } catch (err) {
              setStatus((err as Error).message);
            } finally {
              setIsUploading(false);
            }
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
        >
          {isUploading && (
            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isUploading ? "Uploading..." : "Upload Photo"}
        </button>
        {status && <p className="text-sm text-amber-100">{status}</p>}
      </div>
    </Panel>
  );
}
