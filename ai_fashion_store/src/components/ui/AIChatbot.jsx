import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { getStyleChatCompletion, testOpenAIConnection } from '../../services/openai';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI stylist assistant for Synergize Style. I can help you find the perfect outfit, suggest styling tips, or answer questions about our products. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [openaiStatus, setOpenaiStatus] = useState('checking'); // 'checking', 'available', 'unavailable'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fallback responses for when OpenAI is unavailable
  const fallbackResponses = {
    greeting: [
      "Hello! I\'m excited to help you find your perfect style today!",
      "Hi there! Ready to discover some amazing fashion finds?",
      "Hey! I\'m here to make your shopping experience fantastic!"
    ],
    styling: [
      "For a casual look, try pairing high-waisted jeans with a cropped sweater and white sneakers. Add a denim jacket for extra style!",
      "A midi dress with ankle boots and a leather jacket creates the perfect balance of feminine and edgy.",
      "For professional wear, consider a blazer with tailored trousers and pointed-toe flats. Add a silk scarf for a pop of color!"
    ],
    products: [
      "Our new arrivals include sustainable denim, cozy knitwear, and statement accessories. Would you like me to show you specific categories?",
      "We have amazing pieces in trending colors this season - sage green, warm terracotta, and classic navy. What's your style preference?",
      "Our AI recommendations are based on your style profile, current trends, and what's popular with similar customers."
    ],
    help: [
      "I can help you with outfit suggestions, size recommendations, styling tips, product information, and finding specific items. What interests you most?",
      "Feel free to ask me about trends, how to style specific pieces, or what would work best for different occasions!",
      "I\'m here to make shopping easier! Ask me about anything from color matching to seasonal trends."
    ]
  };

  const quickActions = [
    { label: "Style a casual outfit", category: "styling" },
    { label: "Show new arrivals", category: "products" },
    { label: "Help me find my size", category: "help" },
    { label: "Trending colors", category: "products" }
  ];

  // Test OpenAI connection on component mount
  useEffect(() => {
    const checkOpenAI = async () => {
      try {
        const isAvailable = await testOpenAIConnection();
        setOpenaiStatus(isAvailable ? 'available' : 'unavailable');
        
        if (!isAvailable) {
          console.warn('OpenAI service unavailable - using fallback responses');
        }
      } catch (error) {
        console.error('Failed to test OpenAI connection:', error);
        setOpenaiStatus('unavailable');
      }
    };

    checkOpenAI();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getFallbackResponse = (category) => {
    const responses = fallbackResponses?.[category] || fallbackResponses?.help;
    return responses?.[Math.floor(Math.random() * responses?.length)];
  };

  const categorizeMessage = (message) => {
    const lowerMessage = message?.toLowerCase();
    
    if (lowerMessage?.includes('hello') || lowerMessage?.includes('hi') || lowerMessage?.includes('hey')) {
      return 'greeting';
    }
    if (lowerMessage?.includes('style') || lowerMessage?.includes('outfit') || lowerMessage?.includes('wear') || lowerMessage?.includes('look')) {
      return 'styling';
    }
    if (lowerMessage?.includes('product') || lowerMessage?.includes('new') || lowerMessage?.includes('arrival') || lowerMessage?.includes('color') || lowerMessage?.includes('trend')) {
      return 'products';
    }
    return 'help';
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Update conversation history for OpenAI context
    const newHistory = [...conversationHistory, { role: 'user', content: messageText?.trim() }];

    try {
      // Only try OpenAI if status is available
      if (openaiStatus === 'available') {
        const aiResponse = await getStyleChatCompletion(messageText?.trim(), conversationHistory);
        
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: aiResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
        setConversationHistory([...newHistory, { role: 'assistant', content: aiResponse }]);
      } else {
        // Use fallback immediately if OpenAI is known to be unavailable
        throw new Error('OpenAI service unavailable');
      }
      
    } catch (error) {
      console.error('OpenAI service error:', error);
      
      // Provide more specific error feedback
      let errorMessage = '';
      if (error?.message?.includes('API key')) {
        errorMessage = ' (API key issue - please check configuration)';
      } else if (error?.message?.includes('rate limit')) {
        errorMessage = ' (Rate limit reached - please wait a moment)';
      } else if (error?.message?.includes('network') || error?.message?.includes('Connection')) {
        errorMessage = ' (Network connection issue)';
      } else {
        errorMessage = ' (AI service temporarily unavailable)';
      }
      
      // Use fallback response system with delay for better UX
      setTimeout(() => {
        const category = categorizeMessage(messageText);
        const fallbackContent = getFallbackResponse(category);
        
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: fallbackContent + errorMessage,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
        
        // Mark OpenAI as unavailable if it failed
        if (openaiStatus === 'available') {
          setOpenaiStatus('unavailable');
        }
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action?.label);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-floating transition-all duration-300 ${
            isOpen ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'
          }`}
          size="icon"
        >
          {isOpen ? (
            <Icon name="X" size={24} color="white" />
          ) : (
            <Icon name="MessageCircle" size={24} color="white" />
          )}
        </Button>
        
        {!isOpen && (
          <div className="absolute -top-12 right-0 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-md text-sm whitespace-nowrap animate-fade-in">
            Ask AI Stylist 🤖
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-xl shadow-floating z-40 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-secondary text-white rounded-t-xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Stylist</h3>
                <p className="text-xs opacity-90 flex items-center">
                  {openaiStatus === 'checking' && (
                    <>
                      <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
                      Connecting...
                    </>
                  )}
                  {openaiStatus === 'available' && (
                    <>
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                      Powered by OpenAI
                    </>
                  )}
                  {openaiStatus === 'unavailable' && (
                    <>
                      <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-1"></span>
                      Offline Mode
                    </>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <Icon name="Minimize2" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message?.content}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="ml-2 text-xs">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages?.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Quick actions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs justify-start h-8"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about fashion..."
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage?.trim() || isTyping}
                size="icon"
                className="h-10 w-10"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;