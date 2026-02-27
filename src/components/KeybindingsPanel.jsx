/**
 * KeybindingsPanel Component
 * Displays all current keybindings in a floating panel
 */
import React from 'react';
import { useTranslation } from 'react-i18next';

export const KeybindingsPanel = ({ isOpen, onClose, keybindings }) => {
  const { t } = useTranslation();

  // Handle escape key to close
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          width: '600px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--accent-cyan)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.5px',
            }}
          >
            ⌨ {t('keybindings.panel.title', 'KEYBOARD SHORTCUTS')}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 8px',
              lineHeight: '1',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--accent-red)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div
            style={{
              marginBottom: '16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {t('keybindings.panel.description', 'Press the following keys to toggle map layers:')}
          </div>

          {/* Keybindings list */}
          <div
            style={{
              display: 'grid',
              gap: '8px',
            }}
          >
            {keybindings.map(({ key, description }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                }}
              >
                <kbd
                  style={{
                    minWidth: '40px',
                    padding: '6px 12px',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--accent-amber)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 0 var(--border-color)',
                  }}
                >
                  {key}
                </kbd>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                  }}
                >
                  {description}
                </span>
              </div>
            ))}

            {/* Special keybinding for help */}
            <div
              style={{
                marginTop: '8px',
                padding: '12px 16px',
                background: 'var(--bg-panel)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <kbd
                style={{
                  minWidth: '40px',
                  padding: '6px 12px',
                  background: 'var(--bg-secondary)',
                  border: '2px solid var(--accent-cyan)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--accent-cyan)',
                  textAlign: 'center',
                  boxShadow: '0 2px 0 var(--accent-cyan)',
                }}
              >
                ?
              </kbd>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                }}
              >
                {t('keybindings.panel.toggle', 'Toggle this help panel')}
              </span>
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: '20px',
              padding: '12px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: '1.5',
            }}
          >
            💡 {t('keybindings.panel.note', 'Press ESC or click outside to close this panel')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeybindingsPanel;
