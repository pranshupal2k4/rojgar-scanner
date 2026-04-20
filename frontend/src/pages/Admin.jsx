import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api.js";

const emptyForm = {
  title: "",
  category: "latest-job",
  status: "Active",
  badge: "New",
  board: "",
  eligibility: "",
  ageLimit: "",
  applicationFee:  { general: "", obc: "", scst: "", female: "" },
  importantDates:  { applyStart: "", lastDate: "", examDate: "", admitCard: "" },
  importantLinks:  { applyOnline: "", officialWebsite: "", notificationPdf: "", syllabusPdf: "", answerKey: "", admitCard: "", result: "" },
  banner:          { image: "", link: "" },
  howToApply: "",
  fullDetails: "",
};

export default function Admin() {
  const [form,   setForm]   = useState(emptyForm);
  const [jobs,   setJobs]   = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => { loadJobs(); }, []);

  const loadJobs = async () => {
    try {
      const res = await axios.get(API_URL);
      setJobs(res.data.jobs || []);
    } catch { alert("Could not load jobs — backend chal raha hai?"); }
  };

  const submitJob = async () => {
    if (!form.title.trim()) return alert("Title required");
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
        alert("Job updated ✓");
      } else {
        await axios.post(API_URL, form);
        alert("Job published ✓");
      }
      setForm(emptyForm);
      setEditId(null);
      loadJobs();
    } catch { alert("Save failed — backend check karo"); }
  };

  const deleteJob = async (id, title) => {
    if (!window.confirm(`"${title}" delete karna chahte ho?`)) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadJobs();
    } catch { alert("Delete failed"); }
  };

  const startEdit = (job) => {
    setForm(job);
    setEditId(job._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setForm(emptyForm); setEditId(null); };

  const inp  = { width: "100%", marginBottom: 8, padding: "6px 8px", boxSizing: "border-box" };
  const sect = { fontWeight: 700, marginTop: 16, marginBottom: 6, color: "#b10000" };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 950, margin: "20px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h2 style={{ color: "#b10000" }}>{editId ? "✏️ Job Edit Karo" : "➕ Naya Job Add Karo"}</h2>

      {/* ─── FORM ─────────────────────────────── */}
      <input style={inp} placeholder="Job Title *" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} />

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <select style={{ flex: 1, padding: "6px 8px" }} value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="latest-job">Latest Job</option>
          <option value="result">Result</option>
          <option value="answer-key">Answer Key</option>
          <option value="admit-card">Admit Card</option>
          <option value="private jobs">Private Jobs</option>
          <option value="admission">Admission</option>
        </select>
        <select style={{ flex: 1, padding: "6px 8px" }} value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input style={{ flex: 1, padding: "6px 8px" }} placeholder="Badge (New / Hot)" value={form.badge}
          onChange={e => setForm({ ...form, badge: e.target.value })} />
      </div>

      <input style={inp} placeholder="Board / Organization" value={form.board}
        onChange={e => setForm({ ...form, board: e.target.value })} />

      <textarea style={inp} placeholder="Eligibility" rows={2} value={form.eligibility}
        onChange={e => setForm({ ...form, eligibility: e.target.value })} />

      <textarea style={inp} placeholder="Age Limit" rows={2} value={form.ageLimit}
        onChange={e => setForm({ ...form, ageLimit: e.target.value })} />

      <p style={sect}>Application Fee</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {["general","obc","scst","female"].map(k => (
          <input key={k} style={inp} placeholder={k.toUpperCase() + " Fee"} value={form.applicationFee[k]}
            onChange={e => setForm({ ...form, applicationFee: { ...form.applicationFee, [k]: e.target.value } })} />
        ))}
      </div>

      <p style={sect}>Important Dates</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[["applyStart","Apply Start"],["lastDate","Last Date"],["examDate","Exam Date"],["admitCard","Admit Card Date"]].map(([k, label]) => (
          <input key={k} style={inp} placeholder={label} value={form.importantDates[k]}
            onChange={e => setForm({ ...form, importantDates: { ...form.importantDates, [k]: e.target.value } })} />
        ))}
      </div>

      <textarea style={inp} placeholder="How To Apply" rows={2} value={form.howToApply}
        onChange={e => setForm({ ...form, howToApply: e.target.value })} />

      <p style={sect}>Important Links</p>
      {[["applyOnline","Apply Online URL"],["officialWebsite","Official Website URL"],
        ["notificationPdf","Notification PDF URL"],["syllabusPdf","Syllabus PDF URL"],
        ["answerKey","Answer Key URL"],["admitCard","Admit Card URL"],["result","Result URL"]
      ].map(([k, label]) => (
        <input key={k} style={inp} placeholder={label} value={form.importantLinks[k]}
          onChange={e => setForm({ ...form, importantLinks: { ...form.importantLinks, [k]: e.target.value } })} />
      ))}

      <p style={sect}>Banner Image</p>
      <input style={inp} type="text" placeholder="Banner Image URL paste karo" value={form.banner?.image || ""}
        onChange={e => setForm({ ...form, banner: { ...form.banner, image: e.target.value } })} />
      {form.banner?.image && (
        <img src={form.banner.image} style={{ width: "100%", marginTop: 8, borderRadius: 8 }} alt="preview" />
      )}

      <p style={sect}>Full Details (HTML allowed)</p>
      <textarea style={inp} rows={8} placeholder="Full details yahan likho..." value={form.fullDetails}
        onChange={e => setForm({ ...form, fullDetails: e.target.value })} />

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button onClick={submitJob}
          style={{ padding: "10px 24px", background: "#b10000", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>
          {editId ? "Update Job" : "Publish Job"}
        </button>
        {editId && (
          <button onClick={cancelEdit}
            style={{ padding: "10px 24px", background: "#666", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Cancel
          </button>
        )}
      </div>

      {/* ─── JOB LIST ─────────────────────────── */}
      <h3 style={{ marginTop: 40, color: "#b10000" }}>All Jobs ({jobs.length})</h3>
      <input style={{ ...inp, marginBottom: 12 }} placeholder="Jobs search karo..." value={search}
        onChange={e => setSearch(e.target.value)} />

      {filteredJobs.map(job => (
        <div key={job._id} style={{ padding: "10px 12px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div>
            <span style={{ fontWeight: 600 }}>{job.title}</span>
            <span style={{ marginLeft: 10, fontSize: 12, color: "#888", background: "#eee", padding: "2px 6px", borderRadius: 4 }}>{job.category}</span>
            <span style={{ marginLeft: 6, fontSize: 12, color: job.status === "Active" ? "green" : "gray" }}>{job.status}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => startEdit(job)}
              style={{ padding: "5px 12px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Edit
            </button>
            <button onClick={() => deleteJob(job._id, job.title)}
              style={{ padding: "5px 12px", background: "#e63946", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
