import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import JOBS from "../data/jobs";
import './ApplicationForm.css';
export default function ApplicationForm({ onSuccess, onCancel }) {
    const { jobId } = useParams();
    const job = JOBS.find(j => String(j.id) === String(jobId));
    const jobTitle = job ? job.title : "Unknown Role";
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        resumeName: "",
        coverLetter: "",
        preferredLocation: "",
        notice: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [localSuccess, setLocalSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(pre => ({ ...pre, [name]: value }))
    };
    const handleFile = (e) => {
        const f = e.target.files && e.target.files[0];
        setForm(prev => ({ ...prev, resumeName: f ? f.name : "" }));
    };

    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = "Full name is required.";
        if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Please enter a valid email.";
        if (!/^\+?\d{7,15}$/.test(form.phone.trim())) err.phone = "Please enter a valid phone number (10 digits).";
        if (!form.coverLetter.trim() || form.coverLetter.trim().length < 20) err.coverLetter = "Cover letter should be at least 20 characters.";
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length) return;

        setSubmitting(true);

        // build application object
        const application = {
            id: Date.now().toString(),
            jobId,
            jobTitle,
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            portfolio: form.portfolio.trim(),
            resumeName: form.resumeName,
            coverLetter: form.coverLetter.trim(),
            preferredLocation: form.preferredLocation,
            notice: form.notice,
            createdAt: new Date().toISOString()
        };

        // save to localStorage
        try {
            const existing = JSON.parse(localStorage.getItem("applications") || "[]");
            existing.push(application);
            localStorage.setItem("applications", JSON.stringify(existing));
        } catch (storageErr) {
            console.warn("Failed to save application in localStorage", storageErr);
        }

        setSubmitting(false);

        if (onSuccess) {
            onSuccess(application);
        } else {
            setLocalSuccess(true);
        }
    };

    // cancel handler
    const handleCancel = () => {
        if (onCancel) onCancel();
        else window.history.back();
    };

    if (localSuccess) {
        return (
            <div className="application-success" style={{ marginTop: "1rem" }}>
                <h3>Application received 🎉</h3>
                <p>Thanks for applying to {jobTitle}.
                    <p> We’ll get back to you soon.</p>
                </p>
                <button className="button" onClick={() =>window.location.href = "/careers"}>Back to Careers</button>
            </div>
        );
    }

    return (
        <form className="application-form" onSubmit={handleSubmit} noValidate>
            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <small className="error">{errors.name}</small>}

            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <small className="error">{errors.email}</small>}

            <label>Phone *</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+919XXXXXXXXX" />
            {errors.phone && <small className="error">{errors.phone}</small>}

            <label>Portfolio / Website (optional)</label>
            <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://..." />

            <label>Resume (enter file or choose) — mock upload</label>
            <input name="resume" type="file" onChange={handleFile} />
            {form.resumeName && <small>File: {form.resumeName}</small>}

            <label>Cover Letter *</label>
            <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows="5" placeholder="A short paragraph about why you're a fit..." />
            {errors.coverLetter && <small className="error">{errors.coverLetter}</small>}

            <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem" }}>
                <select name="preferredLocation" value={form.preferredLocation} onChange={handleChange}>
                    <option value="">Preferred Location</option>
                    <option value="Hyderabad (IN)">Hyderabad (IN)</option>
                    <option value="Remote (IN)">Remote (IN)</option>
                </select>

                <select name="notice" value={form.notice} onChange={handleChange}>
                    <option value="">Notice Period</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 days">15 days</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                </select>
            </div>

            <div style={{ marginTop: "0.9rem", display: "flex", gap: "0.6rem" }}>
                <button className="button" type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <button type="button" className="button secondary" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );

}