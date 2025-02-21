import { Edit, Trash2 } from 'lucide-react';
import { useI18n } from '../../lib/i18n/i18n';
import type { Database } from '../../lib/supabase-types';

type Material = Database['public']['Tables']['materials']['Row'];

interface MaterialsListProps {
  materials: Material[];
}

export function MaterialsList({ materials }: MaterialsListProps) {
  const { t } = useI18n();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('materials.properties.bezeichnung')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('materials.properties.hersteller')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('materials.properties.lambda')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('materials.properties.baustoffklasseVKF')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('materials.properties.richtpreisFertigVerbaut')}
            </th>
            <th className="px-6 py-3 relative">
              <span className="sr-only">{t('common.edit')}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {material.bezeichnung}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {material.hersteller}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {material.lambda}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {material.baustoffklasseVKF}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {material.richtpreisFertigVerbaut} {material.einheit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    className="text-brand-orange hover:text-brand-orange/80"
                    onClick={() => {/* TODO: Edit material */}}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {/* TODO: Delete material */}}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}