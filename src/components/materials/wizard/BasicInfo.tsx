import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function BasicInfo() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.designation')} *
        </label>
        <input
          type="text"
          id="designation"
          {...register('designation')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.designation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.designation.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.category')} *
        </label>
        <input
          type="text"
          id="category"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="articleNumber" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.articleNumber')} *
        </label>
        <input
          type="text"
          id="articleNumber"
          {...register('articleNumber')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.articleNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.articleNumber.message as string}
          </p>
        )}
      </div>
    </div>
  );
}