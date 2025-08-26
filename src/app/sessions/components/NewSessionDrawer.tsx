'use client';

import { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { addSession } from '@/lib/firestore';
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from 'sonner';

interface NewSessionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionAdded: () => void;
}

export function NewSessionDrawer({ isOpen, onClose, onSessionAdded }: NewSessionDrawerProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    minutes: '',
    focus: 'drills' as const,
    issues: [] as string[],
    wentWell: [] as string[],
    notes: ''
  });

  const [issueInput, setIssueInput] = useState('');
  const [wentWellInput, setWentWellInput] = useState('');

  const focusOptions = [
    { value: 'drills', label: 'Drills' },
    { value: 'matches', label: 'Matches' },
    { value: 'serves', label: 'Serves' },
    { value: 'dinks', label: 'Dinks' },
    { value: 'footwork', label: 'Footwork' },
    { value: 'strategy', label: 'Strategy' }
  ];

  const addTag = (input: string, setInput: (value: string) => void, field: 'issues' | 'wentWell') => {
    if (input.trim() && !formData[field].includes(input.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], input.trim()]
      }));
      setInput('');
    }
  };

  const removeTag = (tag: string, field: 'issues' | 'wentWell') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.minutes) return;

    setLoading(true);
    try {
      await addSession({
        uid: user.uid,
        date: new Date(formData.date),
        minutes: parseInt(formData.minutes),
        focus: formData.focus,
        issues: formData.issues,
        wentWell: formData.wentWell,
        notes: formData.notes.split('\n').filter(line => line.trim())
      });

      toast.success('Session logged successfully!');
      onSessionAdded();
      onClose();
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        minutes: '',
        focus: 'drills',
        issues: [],
        wentWell: [],
        notes: ''
      });
    } catch (error) {
      console.error('Error adding session:', error);
      toast.error('Failed to log session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minutes
            </label>
            <Input
              type="number"
              min="1"
              value={formData.minutes}
              onChange={(e) => setFormData(prev => ({ ...prev, minutes: e.target.value }))}
              placeholder="30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Area
            </label>
            <select
              value={formData.focus}
              onChange={(e) => setFormData(prev => ({ ...prev, focus: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {focusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issues to Work On
            </label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={issueInput}
                onChange={(e) => setIssueInput(e.target.value)}
                placeholder="Add an issue..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(issueInput, setIssueInput, 'issues'))}
              />
              <Button
                type="button"
                onClick={() => addTag(issueInput, setIssueInput, 'issues')}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.issues.map((issue, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(issue, 'issues')}>
                  {issue} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What Went Well
            </label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={wentWellInput}
                onChange={(e) => setWentWellInput(e.target.value)}
                placeholder="Add something that went well..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(wentWellInput, setWentWellInput, 'wentWell'))}
              />
              <Button
                type="button"
                onClick={() => addTag(wentWellInput, setWentWellInput, 'wentWell')}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.wentWell.map((item, index) => (
                <Badge key={index} variant="default" className="cursor-pointer" onClick={() => removeTag(item, 'wentWell')}>
                  {item} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Additional notes..."
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.minutes}
            className="flex-1"
          >
            {loading ? 'Saving...' : 'Log Session'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}














