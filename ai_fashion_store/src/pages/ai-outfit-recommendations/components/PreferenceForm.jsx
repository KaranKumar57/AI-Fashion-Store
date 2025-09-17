import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreferenceForm = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState({
    gender: '',
    occasion: '',
    favoriteColor: ''
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const occasionOptions = [
    { value: 'party', label: 'Party' },
    { value: 'casual', label: 'Casual' },
    { value: 'office', label: 'Office' },
    { value: 'wedding', label: 'Wedding' }
  ];

  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (preferences?.gender && preferences?.occasion && preferences?.favoriteColor) {
      onSubmit(preferences);
    }
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = preferences?.gender && preferences?.occasion && preferences?.favoriteColor;

  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-sm border border-border">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Sparkles" size={24} color="white" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          AI Style Consultation
        </h2>
        <p className="text-muted-foreground">
          Tell us about your preferences and let our AI stylist create the perfect outfit for you
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Gender"
            placeholder="Select gender"
            options={genderOptions}
            value={preferences?.gender}
            onChange={(value) => handlePreferenceChange('gender', value)}
            required
            className="w-full"
          />

          <Select
            label="Occasion"
            placeholder="Select occasion"
            options={occasionOptions}
            value={preferences?.occasion}
            onChange={(value) => handlePreferenceChange('occasion', value)}
            required
            className="w-full"
          />

          <Select
            label="Favorite Color"
            placeholder="Select color"
            options={colorOptions}
            value={preferences?.favoriteColor}
            onChange={(value) => handlePreferenceChange('favoriteColor', value)}
            required
            className="w-full"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={!isFormValid || isLoading}
            loading={isLoading}
            iconName="Wand2"
            iconPosition="left"
            className="px-8"
          >
            Get AI Recommendations
          </Button>
        </div>
      </form>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How it works:</p>
            <p>Our AI analyzes your preferences, current fashion trends, and seasonal styles to create personalized outfit recommendations just for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceForm;