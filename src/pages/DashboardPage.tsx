import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, Loader, Clock, FileDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { type Resume, emptyResumeData } from '@/types/resume';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });
      if (!error && data) {
        setResumes(data as Resume[]);
      }
      setLoading(false);
    })();
  }, []);

  const createResume = async () => {
    setCreating(true);
    const { data, error } = await supabase
      .from('resumes')
      .insert({ title: 'Untitled Resume', template: 'modern', accent_color: '#4F46E5', data: emptyResumeData })
      .select()
      .single();
    if (!error && data) {
      navigate(`/builder/${data.id}`);
    }
    setCreating(false);
  };

  const deleteResume = async (id: string) => {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (!error) {
      setResumes((r) => r.filter((r) => r.id !== id));
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="container-page pt-28 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">My Resumes</h1>
          <p className="text-ink-500 mt-1">Create, edit, and download your AI-generated resumes.</p>
        </div>
        <button onClick={createResume} className="btn-primary" disabled={creating}>
          {creating ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          New Resume
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 text-brand-500 animate-spin" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-brand-500" />
          </div>
          <h3 className="text-xl font-bold text-ink-900">No resumes yet</h3>
          <p className="text-ink-500 mt-2 max-w-sm mx-auto">
            Create your first AI-powered resume in minutes. Get started with a template.
          </p>
          <button onClick={createResume} className="btn-primary mt-6">
            <Plus className="w-4 h-4" /> Create One Now
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((r) => (
            <div key={r.id} className="card p-5 hover:shadow-card transition-all group">
              <Link to={`/builder/${r.id}`} className="block">
                <div className="aspect-[3/4] bg-ink-50 rounded-lg overflow-hidden mb-4 border border-ink-100 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-ink-300" />
                </div>
              </Link>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link to={`/builder/${r.id}`}>
                    <h3 className="font-bold text-ink-900 truncate hover:text-brand-600 transition-colors">{r.title}</h3>
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(r.updated_at)}</span>
                    <span className="capitalize">{r.template}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteResume(r.id)}
                  className="text-ink-300 hover:text-rose-500 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Link to={`/builder/${r.id}`} className="btn-secondary w-full mt-4 text-xs">
                <FileDown className="w-3.5 h-3.5" /> Open Builder
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
