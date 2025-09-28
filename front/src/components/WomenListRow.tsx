'use client';

import React from 'react';
import { Edit } from 'lucide-react';
import { WomanItem } from '../types/women-list';

interface WomenListRowProps {
  item: WomanItem;
}

const WomenListRow: React.FC<WomenListRowProps> = ({ item }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 100px 60px 1fr 80px 120px 80px',
      padding: '8px 16px',
      borderBottom: '1px solid #f0f0f0',
      alignItems: 'center',
      minHeight: '70px'
    }}>
      {/* Edit Button */}
      <div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 6px',
            backgroundColor: 'transparent',
            color: '#1976d2',
            border: 'none',
            borderRadius: '3px',
            fontSize: '11px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <Edit size={11} />
          編集
        </button>
      </div>

      {/* Profile Image */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '50px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          backgroundImage: `url(${item.profileImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          {/* Number badges */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            left: '2px',
            display: 'flex',
            gap: '2px'
          }}>
            <div style={{
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '8px',
              padding: '1px 3px',
              borderRadius: '2px',
              fontWeight: 'bold'
            }}>
              白5
            </div>
            <div style={{
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '8px',
              padding: '1px 3px',
              borderRadius: '2px',
              fontWeight: 'bold'
            }}>
              色7
            </div>
          </div>
        </div>
      </div>

      {/* Age */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#333',
          fontWeight: '400'
        }}>
          {item.age}
        </div>
      </div>

      {/* Name, Newcomer status and Measurements */}
      <div style={{
        fontSize: '13px',
        color: '#333',
        paddingLeft: '8px'
      }}>
        <div style={{
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#333'
          }}>
            {item.name}
          </span>
          {item.isNewcomer && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px 6px',
              backgroundColor: '#e0e0e0',
              borderRadius: '2px',
              fontSize: '10px',
              color: '#666'
            }}>
              新人
            </span>
          )}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          T.{item.measurements.height}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          B.{item.measurements.bust} (C) W.{item.measurements.waist} H.{item.measurements.hip}
        </div>
      </div>

      {/* Registration Date */}
      <div style={{
        fontSize: '13px',
        color: '#333',
        textAlign: 'center'
      }}>
        {item.registrationDate}
      </div>

      {/* Public Status */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: item.isPublic ? '#e3f2fd' : '#f5f5f5',
          border: `1px solid ${item.isPublic ? '#2196f3' : '#e0e0e0'}`,
          borderRadius: '20px',
          padding: '4px 12px',
          fontSize: '11px',
          color: item.isPublic ? '#1976d2' : '#666'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: item.isPublic ? '#2196f3' : '#bdbdbd',
            marginRight: '6px'
          }}></div>
          公開中
        </div>
      </div>

      {/* Memo Column */}
      <div style={{ textAlign: 'center' }}>
        {/* Empty for memos */}
      </div>
    </div>
  );
};

export default WomenListRow;