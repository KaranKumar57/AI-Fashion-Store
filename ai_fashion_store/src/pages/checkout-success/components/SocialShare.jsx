import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location?.origin;
  const shareText = "Just got some amazing fashion finds from AI Fashion Store! 🛍️✨";

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500'
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      url: 'https://www.instagram.com/',
      color: 'text-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'text-green-600'
    }
  ];

  const handleShare = (platform) => {
    if (platform?.name === 'Instagram') {
      // Instagram doesn't support direct sharing, so we'll copy the text
      handleCopyLink();
      return;
    }
    window.open(platform?.url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center justify-center">
          <Icon name="Share2" size={20} className="mr-2 text-primary" />
          Share Your Fashion Find
        </h3>
        <p className="text-sm text-muted-foreground">
          Let your friends know about your amazing new style!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {socialPlatforms?.map((platform) => (
          <Button
            key={platform?.name}
            variant="outline"
            size="sm"
            onClick={() => handleShare(platform)}
            className="flex flex-col items-center p-4 h-auto space-y-2 hover:bg-muted/50"
          >
            <Icon name={platform?.icon} size={20} className={platform?.color} />
            <span className="text-xs font-medium">{platform?.name}</span>
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
        <div className="flex-1 text-sm text-muted-foreground font-mono bg-background px-3 py-2 rounded border">
          {shareUrl}
        </div>
        <Button
          variant={copied ? "success" : "outline"}
          size="sm"
          onClick={handleCopyLink}
          iconName={copied ? "Check" : "Copy"}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Share your style and inspire others! 💫
        </p>
      </div>
    </div>
  );
};

export default SocialShare;