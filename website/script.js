/**
 * Volumography.com — Main Script
 * Sci-Fi OS Style with Recursive Internal Card Layout
 * 
 * CLICK INTERACTION DESIGN:
 * - Clicking card (cover/name) → Opens Creative.Tech page
 * - Clicking website link → Opens official website
 * - Clicking social icons → Opens respective social page
 * - Tags are NOT clickable (just labels)
 */

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const tagFiltersContainer = document.getElementById('tag-filters');
    const sortSelect = document.getElementById('sort-select');
    const resetBtn = document.getElementById('reset-filters');
    const resultsNumber = document.getElementById('results-number');

    let allCreators = [];
    let selectedTags = new Set();
    let currentSort = 'priority';

    /**
     * Convert string to Title Case
     */
    const toTitleCase = (str) => {
        if (!str) return '';
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    /**
     * Format URL for display (remove protocol and www)
     */
    const formatUrl = (url) => {
        if (!url) return '';
        return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    };

    /**
     * Get first letter of name for avatar placeholder
     */
    const getInitial = (name) => {
        if (!name) return '?';
        return name.trim().charAt(0).toUpperCase();
    };

    /**
     * Social media icons (simple unicode)
     */
    const socialIcons = {
        twitter: '𝕏',
        instagram: '◎',
        youtube: '▶',
        github: '⌘',
        linkedin: '◉',
        tiktok: '♪'
    };

    /**
     * Create a creator card element
     * 
     * STRUCTURE:
     * ┌─────────────────────────┐
     * │     [COVER IMAGE]   [↗] │  ← Clickable → CT Link
     * ├─────────────────────────┤
     * │ [A]  Name               │  ← Clickable → CT Link
     * │      Title              │
     * │      Subtitle           │
     * │      Location           │
     * │      website.com  𝕏 ◎   │  ← Website clickable, social icons clickable
     * ├─────────────────────────┤
     * │ TAG · TAG · TAG         │  ← NOT clickable (just labels)
     * └─────────────────────────┘
     */
    const createCard = (creator, index) => {
        // Get links
        const ctLink = creator.links?.ct || null;
        const websiteLink = creator.links?.website || null;
        const hasMainLink = !!ctLink;

        // Create card container - entire card is clickable if CT link exists
        const card = document.createElement(hasMainLink ? 'a' : 'div');
        card.className = 'creator-card';
        card.style.animationDelay = `${index * 30}ms`;
        
        if (hasMainLink) {
            card.href = ctLink;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
        }

        // Build card HTML
        let html = '';
        
        // ===== MEDIA SECTION (TOP) =====
        html += '<div class="card-media">';
        // No cover images in current data, show placeholder
        html += '<div class="card-media-placeholder">No Preview</div>';
        
        // Link arrow (shows on hover)
        if (hasMainLink) {
            html += '<span class="card-arrow">↗</span>';
        }
        html += '</div>';
        
        // ===== INFO SECTION (BOTTOM) =====
        html += '<div class="card-info">';
        
        // Avatar (shows initial since no profile images)
        html += '<div class="card-avatar">';
        html += `<span class="card-avatar-placeholder">${getInitial(creator.name)}</span>`;
        html += '</div>';
        
        // Name + Title
        html += '<div class="card-text">';
        html += `<div class="card-name">${toTitleCase(creator.name)}</div>`;
        if (creator.title) {
            html += `<div class="card-specialty">${toTitleCase(creator.title)}</div>`;
        }
        html += '</div>';
        
        // Subtitle (if exists)
        if (creator.subtitle) {
            html += `<div class="card-subtitle">${creator.subtitle}</div>`;
        }
        
        // Location
        if (creator.location) {
            html += `<div class="card-location">${creator.location}</div>`;
        }
        
        // Links Row - Website + Social Icons
        const hasSocialLinks = creator.links && Object.keys(creator.links).some(k => 
            k !== 'ct' && k !== 'website' && socialIcons[k]
        );
        
        if (websiteLink || hasSocialLinks) {
            html += '<div class="card-links">';
            
            // Website link
            if (websiteLink) {
                html += `<a href="${websiteLink}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation();">${formatUrl(websiteLink)}</a>`;
            }
            
            // Social icons
            if (hasSocialLinks) {
                html += '<div class="card-social">';
                for (const [platform, url] of Object.entries(creator.links)) {
                    if (url && platform !== 'ct' && platform !== 'website' && socialIcons[platform]) {
                        html += `<a href="${url}" target="_blank" rel="noopener" class="social-icon" title="${platform}" onclick="event.stopPropagation();">${socialIcons[platform]}</a>`;
                    }
                }
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        // Tags - Clickable, synced with filter
        if (creator.tags?.length) {
            html += '<div class="card-tags">';
            creator.tags.forEach(tag => {
                const isActive = selectedTags.has(tag) ? 'active' : '';
                html += `<button class="tag ${isActive}" data-tag="${tag}" onclick="event.stopPropagation(); event.preventDefault(); window.toggleTagFilter('${tag}')">${tag}</button>`;
            });
            html += '</div>';
        }
        
        html += '</div>';

        card.innerHTML = html;

        return card;
    };

    /**
     * Render the gallery
     */
    const renderGallery = () => {
        // Filter
        let filtered = allCreators.filter(creator => {
            if (selectedTags.size === 0) return true;
            return creator.tags && creator.tags.some(tag => selectedTags.has(tag));
        });

        // Sort
        switch (currentSort) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'random':
                filtered.sort(() => Math.random() - 0.5);
                break;
            case 'priority':
            default:
                // Keep original order (or could prioritize by other criteria)
                break;
        }

        // Update count
        resultsNumber.textContent = filtered.length;
        
        // Clear and rebuild
        gallery.innerHTML = '';
        
        if (filtered.length === 0) {
            gallery.innerHTML = `
                <div class="col-span-full text-center py-20 bg-[#0a0a0a]">
                    <p class="text-[#888] text-sm">No Creators Found</p>
                    <button onclick="document.getElementById('reset-filters').click()" 
                            class="text-[#0052FF] text-sm mt-4">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }
        
        // Create and append cards
        filtered.forEach((creator, index) => {
            const card = createCard(creator, index);
            gallery.appendChild(card);
        });
    };

    /**
     * Setup filter buttons
     */
    const setupFilters = (data) => {
        const tags = new Set();
        data.forEach(c => c.tags?.forEach(t => tags.add(t)));
        
        tagFiltersContainer.innerHTML = '';
        
        Array.from(tags).sort().forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = tag;
            
            btn.addEventListener('click', () => {
                toggleTagFilter(tag);
            });
            
            tagFiltersContainer.appendChild(btn);
        });
    };

    /**
     * Toggle tag filter - can be called from card tags or filter bar
     */
    const toggleTagFilter = (tag) => {
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        
        // Update filter bar buttons
        document.querySelectorAll('#tag-filters .filter-btn').forEach(btn => {
            if (btn.textContent === tag) {
                btn.classList.toggle('active', selectedTags.has(tag));
            }
        });
        
        renderGallery();
    };

    // Expose to global scope for inline onclick handlers
    window.toggleTagFilter = toggleTagFilter;

    /**
     * Reset filters
     */
    resetBtn.addEventListener('click', () => {
        selectedTags.clear();
        document.querySelectorAll('#tag-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        renderGallery();
    });

    /**
     * Sort change
     */
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGallery();
    });

    /**
     * Load data
     */
    fetch('data/creators.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load');
            return res.json();
        })
        .then(data => {
            allCreators = data;
            setupFilters(data);
            renderGallery();
        })
        .catch(err => {
            console.error('Error loading creators:', err);
            gallery.innerHTML = `
                <div class="col-span-full text-center py-20 bg-[#0a0a0a]">
                    <p class="text-red-400 text-sm">Failed To Load Creator Data</p>
                </div>
            `;
        });
});
