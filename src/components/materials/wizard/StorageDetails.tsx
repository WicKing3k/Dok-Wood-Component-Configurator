import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function StorageDetails() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.unit')} *
        </label>
        <input
          type="text"
          id="unit"
          {...register('unit')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.unit && (
          <p className="mt-1 text-sm text-red-600">
            {errors.unit.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.minStock')} *
        </label>
        <input
          type="number"
          id="minStock"
          min="0"
          step="1"
          {...register('minStock', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.minStock && (
          <p className="mt-1 text-sm text-red-600">
            {errors.minStock.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.location')} *
        </label>
        <input
          type="text"
          id="location"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">
            {errors.location.message as string}
          </p>
        )}
      </div>
    </div>
  );
}